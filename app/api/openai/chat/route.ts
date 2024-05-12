import { NextResponse, type NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as { message: string };
  const { message } = body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-2024-04-09',
    messages: [
      {
        role: 'system',
        content: `#RULE
You are a helpful assistant that can answer any question you ask. You can ask me anything you want to know.`,
      },
      {
        role: 'user',
        content: `${message}`,
      },
    ],
  });

  console.log(completion.choices[0]);

  return NextResponse.json({
    message: completion.choices[0],
  });
}
