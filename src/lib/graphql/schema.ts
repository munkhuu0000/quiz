import { and, desc, eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { createSchema } from "graphql-yoga";
import { articles, quizAttempts } from "@/db/schema";
import { getDb } from "@/lib/db";

type AppGraphQLContext = {
  db: ReturnType<typeof getDb>;
  userId: string | null;
};

function requireUserId(userId: string | null) {
  if (!userId) {
    throw new GraphQLError("Unauthorized", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }

  return userId;
}

function parseJson<T>(value: string): T {
  return JSON.parse(value) as T;
}

function mapArticle(row: typeof articles.$inferSelect) {
  return {
    ...row,
    quiz: parseJson(row.quizJson),
  };
}

function mapQuizAttempt(row: typeof quizAttempts.$inferSelect) {
  return {
    ...row,
    answers: parseJson(row.answersJson),
  };
}

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type QuizQuestion {
      id: ID!
      prompt: String!
      options: [String!]!
      correctIndex: Int!
      explanation: String!
    }

    input QuizQuestionInput {
      id: ID!
      prompt: String!
      options: [String!]!
      correctIndex: Int!
      explanation: String!
    }

    type Article {
      id: ID!
      userId: String!
      title: String!
      content: String!
      summary: String!
      quiz: [QuizQuestion!]!
      createdAt: String!
      updatedAt: String!
    }

    type QuizAttempt {
      id: ID!
      articleId: ID!
      userId: String!
      answers: [Int!]!
      score: Int!
      total: Int!
      createdAt: String!
    }

    input SaveArticleInput {
      id: ID
      title: String!
      content: String!
      summary: String!
      quiz: [QuizQuestionInput!]!
    }

    input SaveQuizAttemptInput {
      articleId: ID!
      answers: [Int!]!
      score: Int!
      total: Int!
    }

    type Query {
      myArticles: [Article!]!
      article(id: ID!): Article
      myQuizAttempts(articleId: ID): [QuizAttempt!]!
    }

    type Mutation {
      saveArticle(input: SaveArticleInput!): Article!
      saveQuizAttempt(input: SaveQuizAttemptInput!): QuizAttempt!
      deleteArticle(id: ID!): Boolean!
    }
  `,
  resolvers: {
    Query: {
      myArticles: async (_parent, _args, ctx: AppGraphQLContext) => {
        const userId = requireUserId(ctx.userId);
        const rows = await ctx.db
          .select()
          .from(articles)
          .where(eq(articles.userId, userId))
          .orderBy(desc(articles.createdAt))
          .all();

        return rows.map(mapArticle);
      },

      article: async (
        _parent,
        args: { id: string },
        ctx: AppGraphQLContext,
      ) => {
        const userId = requireUserId(ctx.userId);
        const row = await ctx.db
          .select()
          .from(articles)
          .where(and(eq(articles.id, args.id), eq(articles.userId, userId)))
          .get();

        return row ? mapArticle(row) : null;
      },

      myQuizAttempts: async (
        _parent,
        args: { articleId?: string | null },
        ctx: AppGraphQLContext,
      ) => {
        const userId = requireUserId(ctx.userId);

        const rows = args.articleId
          ? await ctx.db
              .select()
              .from(quizAttempts)
              .where(
                and(
                  eq(quizAttempts.userId, userId),
                  eq(quizAttempts.articleId, args.articleId),
                ),
              )
              .orderBy(desc(quizAttempts.createdAt))
              .all()
          : await ctx.db
              .select()
              .from(quizAttempts)
              .where(eq(quizAttempts.userId, userId))
              .orderBy(desc(quizAttempts.createdAt))
              .all();

        return rows.map(mapQuizAttempt);
      },
    },

    Mutation: {
      saveArticle: async (
        _parent,
        args: {
          input: {
            id?: string | null;
            title: string;
            content: string;
            summary: string;
            quiz: unknown[];
          };
        },
        ctx: AppGraphQLContext,
      ) => {
        const userId = requireUserId(ctx.userId);
        const now = new Date().toISOString();

        if (args.input.id) {
          const existing = await ctx.db
            .select()
            .from(articles)
            .where(
              and(eq(articles.id, args.input.id), eq(articles.userId, userId)),
            )
            .get();

          if (!existing) {
            throw new GraphQLError("Article not found", {
              extensions: { code: "NOT_FOUND" },
            });
          }

          await ctx.db
            .update(articles)
            .set({
              title: args.input.title,
              content: args.input.content,
              summary: args.input.summary,
              quizJson: JSON.stringify(args.input.quiz),
              updatedAt: now,
            })
            .where(
              and(eq(articles.id, args.input.id), eq(articles.userId, userId)),
            );

          const updated = await ctx.db
            .select()
            .from(articles)
            .where(eq(articles.id, args.input.id))
            .get();

          return mapArticle(updated!);
        }

        const id = crypto.randomUUID();

        await ctx.db.insert(articles).values({
          id,
          userId,
          title: args.input.title,
          content: args.input.content,
          summary: args.input.summary,
          quizJson: JSON.stringify(args.input.quiz),
          createdAt: now,
          updatedAt: now,
        });

        const created = await ctx.db
          .select()
          .from(articles)
          .where(eq(articles.id, id))
          .get();

        return mapArticle(created!);
      },

      saveQuizAttempt: async (
        _parent,
        args: {
          input: {
            articleId: string;
            answers: number[];
            score: number;
            total: number;
          };
        },
        ctx: AppGraphQLContext,
      ) => {
        const userId = requireUserId(ctx.userId);

        const article = await ctx.db
          .select()
          .from(articles)
          .where(
            and(
              eq(articles.id, args.input.articleId),
              eq(articles.userId, userId),
            ),
          )
          .get();

        if (!article) {
          throw new GraphQLError("Article not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        const id = crypto.randomUUID();
        const now = new Date().toISOString();

        await ctx.db.insert(quizAttempts).values({
          id,
          articleId: args.input.articleId,
          userId,
          answersJson: JSON.stringify(args.input.answers),
          score: args.input.score,
          total: args.input.total,
          createdAt: now,
        });

        const created = await ctx.db
          .select()
          .from(quizAttempts)
          .where(eq(quizAttempts.id, id))
          .get();

        return mapQuizAttempt(created!);
      },

      deleteArticle: async (
        _parent,
        args: { id: string },
        ctx: AppGraphQLContext,
      ) => {
        const userId = requireUserId(ctx.userId);

        await ctx.db
          .delete(articles)
          .where(and(eq(articles.id, args.id), eq(articles.userId, userId)));

        return true;
      },
    },
  },
});
