import { NextResponse, type NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { mode: string; keywords: string[] };
    const { mode, keywords } = body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-2024-04-09',
      messages: [
        {
          role: 'system',
          content: `#ROLE
You are speaking to a ${mode}. Given keywords, generate something to say in Korean.`,
        },
        {
          role: 'user',
          content: `# KEYWORDS
  ${keywords.join(' ')}`,
        },
      ],
    });

    console.log(completion.choices[0]);

    return NextResponse.json({
      message: completion.choices[0],
    });
  } catch (error) {
    return error;
  }
}
