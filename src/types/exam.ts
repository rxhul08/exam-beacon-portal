
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  tags: string[];
}

export interface Answer {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
  timestamp: Date;
}

export interface ExamResult {
  candidateEmail: string;
  answers: Answer[];
  score: number;
  completedAt: Date;
}
