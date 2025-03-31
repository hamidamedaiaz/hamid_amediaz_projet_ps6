export interface Question{
    questionId: number;
    question: string;
    answers: string[];
    correctAnswer: string;
    hints: string[];
    musicPath: string;
}