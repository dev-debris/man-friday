import { NextResponse, type NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as { mode: string; keywords: string[] };
  const { mode, keywords } = body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-2024-04-09',
    messages: [
      {
        role: 'system',
        content: `#ROLE
You are speaking to a ${mode}. The keywords given are words that describe your state or mood. Make up whatever you want to say in Korean.`,
      },
      {
        role: 'user',
        content: `# KEYWORDS
${keywords.join(' ')}`,
      },
    ],
  });

  console.log(JSON.stringify(completion, null, 2));

  return NextResponse.json({
    ...completion.choices[0],
  });
}
