'use client';
import { useState } from 'react';
import NameScreen from './name-screen';
import QuizScreen from './quiz-screen';
import ResultScreen from './result-screen';

export default function QuizApp() {
  const [name, setName] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const [passed, setPassed] = useState<boolean>(false);

  const handleNameSubmit = (n: string) => setName(n);
  const handleQuizSubmit = (s: number) => {
    setScore(s);
    setPassed(s >= 3); // pass if 3 or more correct out of 5
  };

  if (!name) {
    return <NameScreen onSubmit={handleNameSubmit} />;
  }
  if (score === null) {
    return (
      <>
        <div className="text-xl mb-4">Welcome, {name}!</div>
        <QuizScreen name={name} onSubmit={handleQuizSubmit} />
      </>
    );
  }
  return <ResultScreen name={name} score={score} passed={passed} />;
}
