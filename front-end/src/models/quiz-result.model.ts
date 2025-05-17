import { Profile } from './profile.model';
import { Quiz } from './quiz.model';
import { QuestionResult } from './question-result.model';
import { Gamemode } from './gamemode.model';

export interface QuizResult {
  quizSessionId: number;
  quiz: Quiz;
  profile: Profile;
  date: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  hintsUsed: number;
  questionResults: QuestionResult[];
  gamemode:Gamemode;
}