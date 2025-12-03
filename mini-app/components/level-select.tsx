'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onSelect: (level: 'Easy' | 'Medium' | 'Hard') => void;
}

export default function LevelSelect({ onSelect }: Props) {
  const [selected, setSelected] = useState<'Easy' | 'Medium' | 'Hard' | null>(null);

  const handleClick = (level: 'Easy' | 'Medium' | 'Hard') => {
    setSelected(level);
    onSelect(level);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl">Select Difficulty</h2>
      <div className="flex gap-4">
        <Button
          variant={selected === 'Easy' ? 'default' : 'outline'}
          onClick={() => handleClick('Easy')}
        >
          Easy
        </Button>
        <Button
          variant={selected === 'Medium' ? 'default' : 'outline'}
          onClick={() => handleClick('Medium')}
        >
          Medium
        </Button>
        <Button
          variant={selected === 'Hard' ? 'default' : 'outline'}
          onClick={() => handleClick('Hard')}
        >
          Hard
        </Button>
      </div>
    </div>
  );
}
