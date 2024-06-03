import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const pathname = req.nextUrl.pathname;
  const date = pathname.split('/').pop();

  const messages: { type: string; message: string; createdAt: Date }[] = [
    {
      type: 'assistant',
      message: '안녕하세요! 무엇을 도와드릴까요?',
      createdAt: new Date(`${date}T09:00:00`),
    },
    {
      type: 'user',
      message: '안녕하세요! 오늘 날씨가 어떤가요?',
      createdAt: new Date(`${date}T09:01:00`),
    },
    {
      type: 'assistant',
      message: '오늘은 맑은 날씨입니다.',
      createdAt: new Date(`${date}T09:02:00`),
    },
    {
      type: 'user',
      message: '오늘 뭐할까요?',
      createdAt: new Date(`${date}T09:03:00`),
    },
    {
      type: 'assistant',
      message: '오늘은 쇼핑을 가보는 것은 어떨까요?',
      createdAt: new Date(`${date}T09:04:00`),
    },
  ];

  console.log(messages);

  return NextResponse.json({ messages });
}
