import { NextResponse } from "next/server";
import OpenAI from "openai";

type RawQuizQuestion = {
  id?: unknown;
  prompt?: unknown;
  options?: unknown;
  correctIndex?: unknown;
  explanation?: unknown;
};

type QuizRequestBody = {
  articleTitle?: unknown;
  articleContent?: unknown;
  articleSummary?: unknown;
};

let openAIClient: OpenAI | null = null;

function getOpenAIClient() {
  if (!openAIClient) {
    openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openAIClient;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeQuiz(rawQuiz: unknown) {
  if (!Array.isArray(rawQuiz) || rawQuiz.length !== 5) {
    throw new Error("Quiz нь яг 5 асуулттай байх ёстой");
  }

  return rawQuiz.map((item, index) => {
    const question = item as RawQuizQuestion;

    if (!isNonEmptyString(question.prompt)) {
      throw new Error(`${index + 1}-р асуултын prompt буруу байна`);
    }

    if (
      !Array.isArray(question.options) ||
      question.options.length !== 4 ||
      !question.options.every(isNonEmptyString)
    ) {
      throw new Error(`${index + 1}-р асуултын options буруу байна`);
    }

    if (
      typeof question.correctIndex !== "number" ||
      !Number.isInteger(question.correctIndex) ||
      question.correctIndex < 0 ||
      question.correctIndex > 3
    ) {
      throw new Error(`${index + 1}-р асуултын correctIndex буруу байна`);
    }

    if (!isNonEmptyString(question.explanation)) {
      throw new Error(`${index + 1}-р асуултын explanation буруу байна`);
    }

    return {
      id: isNonEmptyString(question.id) ? question.id : `question-${index + 1}`,
      prompt: question.prompt.trim(),
      options: question.options.map((option) => option.trim()),
      correctIndex: question.correctIndex,
      explanation: question.explanation.trim(),
    };
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as QuizRequestBody;
    const { articleTitle, articleContent, articleSummary } = body;

    if (!isNonEmptyString(articleTitle) || !isNonEmptyString(articleContent)) {
      return NextResponse.json(
        { error: "articleTitle эсвэл articleContent буруу байна" },
        { status: 400 },
      );
    }

    const summaryText = isNonEmptyString(articleSummary)
      ? articleSummary.trim()
      : "Summary байхгүй";

    const messages = [
      {
        role: "system" as const,
        content: `Та бол өгөгдсөн нийтлэлээс яг 5 асуулттай quiz үүсгэдэг AI assistant.

Үндсэн дүрэм:
- Асуулт, сонголт, тайлбар бүгд Монгол хэл дээр байна.
- Зөвхөн өгөгдсөн нийтлэлийн title, summary, content-д тулгуурлана.
- Яг 5 асуулт гаргана.
- Асуулт бүр 4 сонголттой байна.
- Зөв хариулт зөвхөн 1 байна.
- correctIndex нь 0, 1, 2, эсвэл 3 байна.
- explanation нь богино, тодорхой тайлбар байна.
- Агуулгад байхгүй мэдээлэл зохиож болохгүй.
- Хэт амархан биш, гэхдээ summary-г уншсан хүн хариулж чадахаар байна.

Та зөвхөн JSON буцаана.
JSON бүтэц яг ийм байна:

{
  "quiz": [
    {
      "id": "question-1",
      "prompt": "string",
      "options": ["string", "string", "string", "string"],
      "correctIndex": 0,
      "explanation": "string"
    }
  ]
}

Нэмэлт текст, markdown, тайлбар, code fence буцаахгүй.`,
      },
      {
        role: "user" as const,
        content: `Нийтлэлийн гарчиг:
${articleTitle.trim()}

Хураангуй:
${summaryText}

Нийт агуулга:
${articleContent.trim()}`,
      },
    ];

    const response = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4,
      max_completion_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const rawContent = response.choices[0]?.message?.content?.trim() ?? "";

    if (!rawContent) {
      return NextResponse.json({ error: "Quiz хоосон ирлээ" }, { status: 500 });
    }

    const parsed = JSON.parse(rawContent) as { quiz?: unknown };
    const quiz = normalizeQuiz(parsed.quiz);

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("OpenAI quiz route failed:", error);

    return NextResponse.json(
      { error: "Quiz үүсгэх үед алдаа гарлаа" },
      { status: 500 },
    );
  }
}
