import { Profile } from './profile.model';
import { Quiz } from './quiz.model';
import { Answer } from './answer.model';

export interface QuizResult {
  id: number;
  quiz: Quiz;
  profile: Profile;
  date: Date;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  hintsUsed: number;
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: number;
  question: string;
  correctAnswer: Answer;
  userAnswer: Answer | null;
  isCorrect: boolean;
  timeSpent: number;
  hintsUsed: number;
}