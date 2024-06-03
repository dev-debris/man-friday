import MessageGenerator from "@/features/message-generators/MessageGenerator";
import styles from "@/pages/home/home.css";
import ChatUI from "@/widgets/ChatUI";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>채팅 메시지 생성기</h1>
      <MessageGenerator />
      <ChatUI />
    </main>
  );
}
