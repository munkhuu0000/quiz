import { NextResponse } from "next/server";
import OpenAI from "openai";

type SummaryRequestBody = {
  articleTitle?: unknown;
  articleContent?: unknown;
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SummaryRequestBody;
    const { articleTitle, articleContent } = body;

    if (
      typeof articleTitle !== "string" ||
      typeof articleContent !== "string" ||
      !articleTitle.trim() ||
      !articleContent.trim()
    ) {
      return NextResponse.json(
        { error: "articleTitle эсвэл articleContent буруу байна" },
        { status: 400 },
      );
    }

    const conversationMessages = [
      {
        role: "system" as const,
        content: `Та бол өгөгдсөн article болон content-ийг Монгол хэл дээр үнэн зөв, ойлгомжтойгоор хураангуйлдаг AI assistant.

Таны үндсэн үүрэг:
- Хэрэглэгчээс ирсэн article title болон content-ийг уншиж, зөвхөн тухайн агуулгад тулгуурлан summary гаргах.
- Summary-г заавал Монгол хэлээр бичих.
- Хамгийн чухал санаа, гол баримт, дүгнэлт, шалтгаан-үр дагаврын холбоог алдалгүй товчлох.
- Илүү үг, давталт, хийсвэр тайлбар, агуулгаас гадуурх таамаглал нэмэхгүй байх.
- Content дотор байхгүй мэдээллийг зохиож бичихгүй байх.
- Хэрэв content дутуу, ойлгомжгүй байвал summary дотроо үүнийг товч тэмдэглэх.

Гаралтын шаардлага:
- 1-3 богино догол мөрөөр summary гарга.
- Хэллэг нь энгийн, ойлгомжтой, цэвэр Монгол хэлтэй байна.
- "Энэ summary нь..." гэх мэт илүү тайлбаргүй, шууд summary-гаа өг.
- Markdown, жагсаалт, гарчиг хэрэглэхгүй.
- Зөвхөн summary текст буцаа.`,
      },
      {
        role: "user" as const,
        content: `Article title: ${articleTitle}\n\nContent:\n${articleContent}`,
      },
    ];

    const response = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversationMessages,
      temperature: 1,
      max_completion_tokens: 800,
    });

    const summary = response.choices[0]?.message?.content?.trim() ?? "";

    if (!summary) {
      return NextResponse.json(
        { error: "Summary хоосон ирлээ" },
        { status: 500 },
      );
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("OpenAI summary route failed:", error);

    return NextResponse.json(
      { error: "Summary гаргах үед алдаа гарлаа" },
      { status: 500 },
    );
  }
}
