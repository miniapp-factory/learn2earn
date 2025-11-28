'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { saveResult } from './local-storage';

interface Props {
  name: string;
  score: number;
  passed: boolean;
}

export default function ResultScreen({ name, score, passed }: Props) {
  const badgeText = passed ? 'Pass' : 'Fail';
  const verificationCode = `${name}-${badgeText}`.slice(0, 8);

  useEffect(() => {
    saveResult({ name, score, badge: badgeText, code: verificationCode });
  }, [name, score, badgeText, verificationCode]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="border p-4 rounded">
        <p>{badgeText}</p>
      </div>
      <p>Verification Code: {verificationCode}</p>
      <Button onClick={() => window.location.reload()}>Restart</Button>
    </div>
  );
}
