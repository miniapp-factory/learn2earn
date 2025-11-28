export interface Result {
  name: string;
  score: number;
  badge: string;
  code: string;
}

export function saveResult(result: Result) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('quizResult', JSON.stringify(result));
  }
}
