'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  name: string;
  onSubmit: (score: number) => void;
}

const questions = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    answer: 1,
  },
  {
    question: 'What color is the sky on a clear day?',
    options: ['Blue', 'Green', 'Red'],
    answer: 0,
  },
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Rome'],
    answer: 1,
  },
];

export default function QuizScreen({ name, onSubmit }: Props) {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const handleSelect = (qIndex: number, optIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const score = answers.reduce((acc, ans, idx) => {
      return acc + (ans === questions[idx].answer ? 1 : 0);
    }, 0);
    onSubmit(score);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Quiz for {name}</h2>
      {questions.map((q, idx) => (
        <div key={idx} className="border p-2 rounded">
          <p>{q.question}</p>
          {q.options.map((opt, oIdx) => (
            <label key={oIdx} className="block">
              <input
                type="radio"
                name={`q${idx}`}
                checked={answers[idx] === oIdx}
                onChange={() => handleSelect(idx, oIdx)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <Button onClick={handleSubmit} disabled={answers.includes(-1)}>
        Submit
      </Button>
    </div>
  );
}
