'use client';
import styles from '@/features/message-generators/styles.css';
import apiRoutes from '@/shared/api/apiRoutes';
import { useState } from 'react';

type GeneratingMode = 'friend' | 'family' | 'work' | 'lover';
interface Keyword {
  value: string;
}

const options: { label: string; value: GeneratingMode }[] = [
  { label: '친구', value: 'friend' },
  { label: '가족', value: 'family' },
  { label: '직장', value: 'work' },
  { label: '연인', value: 'lover' },
];

const MessageGenerator = () => {
  const [mode, setMode] = useState<GeneratingMode>('friend');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleChangeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value as GeneratingMode);
  };

  const handleClickToAddKeyword = () => {
    setKeywords([...keywords, { value: '' }]);
  };

  const handleChangeKeyword =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newKeywords = keywords.map((keyword, i) => {
        if (i === index) {
          return { ...keyword, value: event.target.value };
        }
        return keyword;
      });
      setKeywords(newKeywords);
    };

  const generateMessage = async (args: {
    mode: string;
    keywords: string[];
  }) => {
    const res = await fetch(apiRoutes.openAIAutoMessage, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    if (res.ok) {
      const data = await res.json();
      setMessage(data.message.content);
    } else {
      console.error('Failed to generate message');
    }
  };

  const handleClickToGenerate = async () => {
    const keywordValues = keywords.map((keyword) => keyword.value);
    await generateMessage({ mode, keywords: keywordValues });
  };

  const handleChangeMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleClickToShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: '채팅 메시지 생성기',
        text: message,
      });
    } else {
      console.error('Web Share API is not supported');
    }
  };

  return (
    <div>
      <select onChange={handleChangeMode} data-testid='select-mode'>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={handleClickToAddKeyword} data-testid='add-keyword'>
        키워드 추가
      </button>
      <ul>
        {keywords.map((keyword, index) => (
          <li key={index}>
            <input
              type='text'
              value={keyword.value}
              onChange={handleChangeKeyword(index)}
              data-testid={`keyword-input-${index}`}
            />
          </li>
        ))}
      </ul>
      <textarea
        value={message}
        data-testid='generated-message'
        onChange={handleChangeMessage}
      />
      <div className={styles.buttonGroup}>
        <button onClick={handleClickToShare}>공유</button>
        <button onClick={handleClickToGenerate} data-testid='generate-button'>
          생성
        </button>
      </div>
    </div>
  );
};
export default MessageGenerator;
