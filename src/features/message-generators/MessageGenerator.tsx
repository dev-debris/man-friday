'use client';

type GeneratingMode = 'friend' | 'family' | 'work' | 'lover';
const options: { label: string; value: GeneratingMode }[] = [
  { label: '친구', value: 'friend' },
  { label: '가족', value: 'family' },
  { label: '직장', value: 'work' },
  { label: '연인', value: 'lover' },
];
const MessageGenerator = () => {
  const handleClickToAddKeyword = () => {};

  const handleClickToGenerate = () => {};

  return (
    <>
      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={handleClickToAddKeyword}>키워드 추가</button>
      <button onClick={handleClickToGenerate}>생성</button>
    </>
  );
};
export default MessageGenerator;
