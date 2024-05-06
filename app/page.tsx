import MessageGenerator from '@/features/message-generators/MessageGenerator';
import styles from './page.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>채팅 메시지 생성기</h1>
      <MessageGenerator />
    </main>
  );
}
