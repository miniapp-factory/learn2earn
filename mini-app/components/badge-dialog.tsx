'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Result {
  name: string;
  score: number;
  badge: string;
  code: string;
}

export default function BadgeDialog() {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quizResult');
      if (stored) {
        setResult(JSON.parse(stored));
      }
    }
  }, []);

  if (!result) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View My Badge</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Badge</DialogTitle>
          <DialogDescription>
            <div className="border p-4 rounded mb-2">
              <p>{result.badge}</p>
            </div>
            <p>Verification Code: {result.code}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
