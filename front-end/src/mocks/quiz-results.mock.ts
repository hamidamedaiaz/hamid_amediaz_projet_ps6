import { QuizResult, QuestionResult } from '../models/quiz-result.model';
import { PROFILE_LIST } from './profile-list.mock';
import { QUESTION, QUESTIONS } from './question.mock';
import * as ANSWERS from './answer.mock';

interface MonthlyStatsData {
  month: string;
  score: number;
  hintUsage: number;
  responseTime: number;
  accuracy: number;
}

interface PlayerStatsMap {
  [key: number]: MonthlyStatsData[];
}

interface QuizStatsMap {
  [key: number]: MonthlyStatsData[];
}

interface MonthlyStatsCollection {
  players: PlayerStatsMap;
}

