'use client';

import { useCallback, useState } from 'react';

type GeneratingMode = 'friend' | 'family' | 'work' | 'lover';
const options: { label: string; value: GeneratingMode }[] = [
  { label: '친구', value: 'friend' },
  { label: '가족', value: 'family' },
  { label: '직장', value: 'work' },
  { label: '연인', value: 'lover' },
];

interface Keyword {
  value: string;
}

const MessageGenerator = ({
  onSubmit,
}: {
  onSubmit?: (args: { mode: GeneratingMode; keywords: string[] }) => void;
}) => {
  const [mode, setMode] = useState<GeneratingMode>('friend');
  const [keywords, setKeywords] = useState<Keyword[]>([]);

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

  const handleClickToGenerate = () => {
    const keywordValues = keywords.map((keyword) => keyword.value);
    onSubmit?.({ mode, keywords: keywordValues });
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
      <button onClick={handleClickToGenerate} data-testid='generate-button'>
        생성
      </button>
    </div>
  );
};
export default MessageGenerator;
