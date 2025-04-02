import { Question } from "src/models/question.model";
import * as ANSWERS from "./answer.mock";

export const QUESTION: Question = {
    questionId: 0,
    question: "Question1",
    answers: [ANSWERS.ANSWER1, ANSWERS.ANSWER2, ANSWERS.ANSWER3],
    correctAnswer: [ANSWERS.ANSWER4],
    musicPath: "chemin"
}