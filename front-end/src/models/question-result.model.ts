import { Answer } from "./answer.model";

export interface QuestionResult {
  quizId: number;
  questionId: number;
  answerIds: number[];
  timeSpent: number;
  numberOfHintsUsed: number;
}