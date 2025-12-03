'use client';
import { useState, useEffect } from 'react';
  function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
import { Button } from '@/components/ui/button';

interface Props {
  name: string;
  level: 'Easy' | 'Medium' | 'Hard';
  onSubmit: (score: number) => void;
}

const questions = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    answer: 1,
    level: 'Easy',
  },
  {
    question: 'What color is the sky on a clear day?',
    options: ['Blue', 'Green', 'Red'],
    answer: 0,
    level: 'Easy',
  },
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Rome'],
    answer: 1,
    level: 'Easy',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'What is the boiling point of water at sea level?',
    options: ['90°C', '100°C', '110°C'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Shakespeare', 'Dickens', 'Hemingway'],
    answer: 0,
    level: 'Hard',
  },
  {
    question: 'What is the smallest prime number?',
    options: ['1', '2', '3'],
    answer: 1,
    level: 'Hard',
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide'],
    answer: 2,
    level: 'Hard',
  },
  {
    question: 'What is the currency of Japan?',
    options: ['Yen', 'Dollar', 'Euro'],
    answer: 0,
    level: 'Hard',
  },
];

export default function QuizScreen({ name, level, onSubmit }: Props) {
  const filtered = questions.filter(q => q.level === level);
  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffle(filtered));
  const [answers, setAnswers] = useState<number[]>(Array(shuffledQuestions.length).fill(-1));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (optIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    const score = answers.reduce((acc, ans, idx) => {
      return acc + (ans === shuffledQuestions[idx].answer ? 1 : 0);
    }, 0);
    onSubmit(score);
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Quiz for {name} ({level})</h2>
      <div className="border p-2 rounded">
        <p>{currentQuestion.question}</p>
        {currentQuestion.options.map((opt, oIdx) => (
          <label key={oIdx} className="block">
            <input
              type="radio"
              name={`q${currentIndex}`}
              checked={answers[currentIndex] === oIdx}
              onChange={() => handleSelect(oIdx)}
            />
            {opt}
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={handleBack} disabled={currentIndex === 0}>
          Back
        </Button>
        {currentIndex < shuffledQuestions.length - 1 ? (
          <Button onClick={handleNext} disabled={answers[currentIndex] === -1}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={answers[currentIndex] === -1}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}


