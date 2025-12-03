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

  function getTimeForLevel(level: 'Easy' | 'Medium' | 'Hard'): number {
    switch (level) {
      case 'Easy':
        return 20;
      case 'Medium':
        return 15;
      case 'Hard':
        return 10;
    }
  }
import { Button } from '@/components/ui/button';
import ResultScreen from '@/components/result-screen';

interface Props {
  name: string;
  level: 'Easy' | 'Medium' | 'Hard';
  onSubmit: (score: number) => void;
}

const questions = [
  // Easy level questions
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
    level: 'Easy',
  },
  {
    question: 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe'],
    answer: 1,
    level: 'Easy',
  },
  {
    question: 'What is the boiling point of water at sea level?',
    options: ['90°C', '100°C', '110°C'],
    answer: 1,
    level: 'Easy',
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Shakespeare', 'Dickens', 'Hemingway'],
    answer: 0,
    level: 'Easy',
  },
  {
    question: 'What is the smallest prime number?',
    options: ['1', '2', '3'],
    answer: 1,
    level: 'Easy',
  },
  {
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide'],
    answer: 2,
    level: 'Easy',
  },
  {
    question: 'What is the currency of Japan?',
    options: ['Yen', 'Dollar', 'Euro'],
    answer: 0,
    level: 'Easy',
  },

  // Medium level questions
  {
    question: 'What is the chemical symbol for Gold?',
    options: ['Au', 'Ag', 'Gd'],
    answer: 0,
    level: 'Medium',
  },
  {
    question: 'Which element has the atomic number 6?',
    options: ['Carbon', 'Oxygen', 'Nitrogen'],
    answer: 0,
    level: 'Medium',
  },
  {
    question: 'What is the square root of 144?',
    options: ['10', '12', '14'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra'],
    answer: 2,
    level: 'Medium',
  },
  {
    question: 'Which country hosted the 2016 Summer Olympics?',
    options: ['Brazil', 'China', 'United Kingdom'],
    answer: 0,
    level: 'Medium',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Jupiter', 'Neptune'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'What is the main ingredient in guacamole?',
    options: ['Tomato', 'Avocado', 'Onion'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'Which language is primarily spoken in Brazil?',
    options: ['Spanish', 'Portuguese', 'French'],
    answer: 1,
    level: 'Medium',
  },
  {
    question: 'What is the speed of light in vacuum (approx.)?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s'],
    answer: 0,
    level: 'Medium',
  },

  // Hard level questions
  {
    question: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', 'sin(x)'],
    answer: 0,
    level: 'Hard',
  },
  {
    question: 'Who developed the theory of general relativity?',
    options: ['Isaac Newton', 'Albert Einstein', 'Niels Bohr'],
    answer: 1,
    level: 'Hard',
  },
  {
    question: 'What is the capital of Kazakhstan?',
    options: ['Almaty', 'Astana', 'Nur-Sultan'],
    answer: 2,
    level: 'Hard',
  },
  {
    question: 'Which element has the highest melting point?',
    options: ['Tungsten', 'Iron', 'Gold'],
    answer: 0,
    level: 'Hard',
  },
  {
    question: 'What is the integral of 1/x dx?',
    options: ['ln|x| + C', '1/x + C', 'x + C'],
    answer: 0,
    level: 'Hard',
  },
  {
    question: 'Which country has the largest population?',
    options: ['India', 'China', 'United States'],
    answer: 1,
    level: 'Hard',
  },
  {
    question: 'What is the chemical formula for table salt?',
    options: ['NaCl', 'KCl', 'CaCl2'],
    answer: 0,
    level: 'Hard',
  },
  {
    question: 'Who wrote "The Republic"?',
    options: ['Aristotle', 'Plato', 'Socrates'],
    answer: 1,
    level: 'Hard',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Pacific'],
    answer: 2,
    level: 'Hard',
  },
  {
    question: 'What is the value of Planck’s constant (approx.)?',
    options: ['6.626×10⁻³⁴ J·s', '3.00×10⁸ m/s', '1.60×10⁻¹⁹ C'],
    answer: 0,
    level: 'Hard',
  },
];

export default function QuizScreen({ name, level, onSubmit }: Props) {
  const filtered = questions.filter(q => q.level === level);
  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffle(filtered));
  const [answers, setAnswers] = useState<number[]>(Array(shuffledQuestions.length).fill(-1));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(getTimeForLevel(level));
  const [finalScore, setFinalScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleSelect = (optIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      const correct = shuffledQuestions[currentIndex].answer;
      const userAns = answers[currentIndex];
      const isCorrect = userAns === correct;
      setFeedback(isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${shuffledQuestions[currentIndex].options[correct]}`);
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(getTimeForLevel(level));
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFeedback(null);
    }
  };

  const handleSubmit = () => {
    const correct = shuffledQuestions[currentIndex].answer;
    const userAns = answers[currentIndex];
    const isCorrect = userAns === correct;
    setFeedback(isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${shuffledQuestions[currentIndex].options[correct]}`);
    const score = answers.reduce((acc, ans, idx) => {
      return acc + (ans === shuffledQuestions[idx].answer ? 1 : 0);
    }, 0);
    setFinalScore(score);
    setPassed(score >= Math.ceil(shuffledQuestions.length * 0.7));
    onSubmit(score);
    setShowSummary(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Lock answer if not already answered
          setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            if (newAnswers[currentIndex] === -1) {
              newAnswers[currentIndex] = -1;
            }
            return newAnswers;
          });
          const correct = shuffledQuestions[currentIndex].answer;
          const userAns = answers[currentIndex];
          const isCorrect = userAns === correct;
          setFeedback(isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${shuffledQuestions[currentIndex].options[correct]}`);
          if (currentIndex < shuffledQuestions.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            setTimeLeft(getTimeForLevel(level));
          } else {
            handleSubmit();
          }
          return getTimeForLevel(level);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, level, answers, handleSubmit]);

  const currentQuestion = shuffledQuestions[currentIndex];

  return showSummary ? (
    <ResultScreen name={name} score={finalScore} passed={passed} />
  ) : (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Quiz for {name} ({level})</h2>
      <div className="border p-2 rounded">
        <p>{currentQuestion.question}</p>
        <p>Time left: {timeLeft}s</p>
        const correct = shuffledQuestions[currentIndex].answer;
        const isCorrect = answers[currentIndex] === correct;
        {currentQuestion.options.map((opt, oIdx) => (
          <label key={oIdx} className={`block ${feedback && !isCorrect && oIdx === correct ? 'text-green-600 font-semibold' : ''}`}>
            <input
              type="radio"
              name={`q${currentIndex}`}
              checked={answers[currentIndex] === oIdx}
              onChange={() => handleSelect(oIdx)}
            />
            {opt}
          </label>
        ))}
        {feedback && <p className="mt-2">{feedback}</p>}
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
          <Button onClick={handleSubmit} disabled={false}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}


