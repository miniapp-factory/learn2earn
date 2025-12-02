export interface Result {
  name: string;
  score: number;
  badge: string;
  code: string;
  blockNumber: number;
}

let currentBlock = typeof window !== 'undefined' ? parseInt(localStorage.getItem('blockNumber') || '0', 10) : 0;

export function incrementBlockNumber(): number {
  if (typeof window !== 'undefined') {
    currentBlock += 1;
    localStorage.setItem('blockNumber', currentBlock.toString());
  }
  return currentBlock;
}

export function getCurrentBlockNumber(): number {
  return currentBlock;
}

export function saveResult(result: Omit<Result, 'blockNumber'>): number {
  if (typeof window !== 'undefined') {
    const block = incrementBlockNumber();
    localStorage.setItem('quizResult', JSON.stringify({ ...result, blockNumber: block }));
    return block;
  }
  return currentBlock;
}
