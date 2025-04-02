import { Question } from "src/models/question.model";
import * as ANSWERS from "./answer.mock";

export const QUESTION: Question = {
    questionId: 0,
    question: "Quel est l'auteur de la chanson Billie Jean ?",
    answers: [ANSWERS.ANSWER1, ANSWERS.ANSWER4, ANSWERS.ANSWER3],
    correctAnswer: [ANSWERS.ANSWER2],
    hints:[
        "Son surnom est 'The King of Pop'",
        "Il a popularisé le moonwalk",
        "Il a commencé sa carrière avec ses frères dans un groupe célèbre",
        "Il a chanté 'Smooth Criminal', 'Beat It' et 'Black or White'",
    ],
    audioPath: "../../../../assets/musics/Michael Jackson - Billie Jean.mp3"
}