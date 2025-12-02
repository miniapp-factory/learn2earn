'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { saveResult } from './local-storage';
import BadgeDialog from './badge-dialog';

interface Props {
  name: string;
  score: number;
  passed: boolean;
}

export default function ResultScreen({ name, score, passed }: Props) {
  const badgeText = passed ? 'Pass' : 'Fail';
  const verificationCode = `${name}-${badgeText}`.slice(0, 8);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);

  useEffect(() => {
    const block = saveResult({ name, score, badge: badgeText, code: verificationCode });
    setBlockNumber(block);
  }, [name, score, badgeText, verificationCode]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="border p-4 rounded">
        <p>{badgeText}</p>
      </div>
      <p>Verification Code: {verificationCode}</p>
      {blockNumber !== null && (
        <p className="text-sm text-muted-foreground">
          Stored in Fake Chain: Block #{blockNumber}
        </p>
      )}
      <div className="border p-4 rounded mt-4 w-full max-w-md">
        <p className="font-semibold">Fake Blockchain Record</p>
        <p>Username: {name}</p>
        <p>Badge: {badgeText}</p>
        <p>Verification Code: {verificationCode}</p>
        {blockNumber !== null && <p>Block #: {blockNumber}</p>}
      </div>
      <Button onClick={() => window.location.reload()}>Restart</Button>
      <BadgeDialog />
    </div>
  );
}
