import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = 'edge';

const openai = new OpenAI({
  baseURL: "https://9router.vuhai.io.vn/v1",
  apiKey: "sk-4bd27113b7dc78d1-lh6jld-f4f9c69f",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array." }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "ces-chatbot-gpt-5.4",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const reply = response.choices[0]?.message?.content || "Xin lỗi, tôi đang bận. Vui lòng thử lại sau.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message || "Lỗi kết nối AI Bot." }, { status: 500 });
  }
}
