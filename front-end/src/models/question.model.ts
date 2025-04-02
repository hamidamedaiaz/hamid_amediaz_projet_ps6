import { Answer } from "./answer.model";

export interface Question{
    questionId: number;
    question: string;
    answers: Answer[];
    correctAnswer: Answer[];
    hints?: string[];
    audioPath: string;
}
