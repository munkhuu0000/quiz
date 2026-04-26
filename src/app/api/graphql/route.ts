import { auth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { schema } from "@/lib/graphql/schema";
import { getDb } from "@/lib/db";

const yoga = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema,
  fetchAPI: {
    Request,
    Response,
  },
  graphiql: process.env.NODE_ENV !== "production",
  context: async () => {
    const { userId } = await auth();
    return {
      db: getDb(),
      userId,
    };
  },
});

export async function GET(request: NextRequest) {
  return yoga.handleRequest(request, {});
}

export async function POST(request: NextRequest) {
  return yoga.handleRequest(request, {});
}
