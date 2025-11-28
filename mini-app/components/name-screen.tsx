'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onSubmit: (name: string) => void;
}

export default function NameScreen({ onSubmit }: Props) {
  const [name, setName] = useState('');
  return (
    <div className="flex flex-col gap-4 items-center">
      <label htmlFor="name">Enter your name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <Button
        onClick={() => {
          if (name.trim()) onSubmit(name.trim());
        }}
      >
        Continue
      </Button>
    </div>
  );
}
