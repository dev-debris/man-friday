'use client';
import MessageGenerator from '@/features/message-generators/MessageGenerator';
import styles from './page.css';

export default function Home() {
  const generateMessage = async (args: {
    mode: string;
    keywords: string[];
  }) => {
    const res = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data.message);
    } else {
      console.error('Failed to generate message');
    }
  };
  return (
    <main className={styles.main}>
      <h1>채팅 메시지 생성기</h1>
      <MessageGenerator onSubmit={generateMessage} />
    </main>
  );
}
