import { Question } from "src/models/question.model";
import * as ANSWERS from "./answer.mock";

export const QUESTION: Question = {
    questionId: 0,
    question: "Quel est l'auteur de la chanson Billie Jean ?",
    answers: [ANSWERS.ANSWER1, ANSWERS.ANSWER4, ANSWERS.ANSWER3],
    correctAnswers: [ANSWERS.ANSWER2],
    hints:[
        "Son surnom est 'The King of Pop'",
        "Il a popularisé le moonwalk",
        "Il a commencé sa carrière avec ses frères dans un groupe célèbre",
        "Il a chanté 'Smooth Criminal', 'Beat It' et 'Black or White'",
    ],
    audioPath: "../../../../assets/musics/Michael Jackson - Billie Jean.mp3"
}

export const QUESTIONS: Question[] = [{
    questionId: 101,
    question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
    answers: [
      { questionId: 101, "answerId": 2, "answerContent": "The Beatles" },
      { questionId: 101, "answerId": 3, "answerContent": "The Rolling Stones" }
    ],
    correctAnswers: [
      { questionId: 101, "answerId": 1, "answerContent": "Queen" }
    ],
    hints: ["Le leader du groupe était Freddie Mercury"],
    audioPath: "assets/musics/Michael Jackson - Billie Jean.mp3"
  },
  {
    questionId: 102,
    question: "Quel album des Pink Floyd est sorti en 1973 ?",
    answers: [
      { questionId: 102, "answerId": 5, "answerContent": "The Wall" },
      { questionId: 102, "answerId": 6, "answerContent": "Wish You Were Here" }
    ],
    correctAnswers: [
      { questionId: 102, "answerId": 4, "answerContent": "Dark Side of the Moon" }
    ],
    hints: ["La pochette de l'album représente un prisme"],
    audioPath: "assets/musics/Michael Jackson - Billie Jean.mp3"
  },
  {
    questionId: 103,
    question: "Qui a chanté 'Hotel California' en 1976 ?",
    answers: [
      { questionId: 103, "answerId": 8, "answerContent": "Fleetwood Mac" },
      { questionId: 103, "answerId": 9, "answerContent": "Led Zeppelin" }
    ],
    correctAnswers: [
      { questionId: 103, "answerId": 7, "answerContent": "The Eagles" }
    ],
    hints: ["Le groupe est connu pour son style country rock"],
    audioPath: "assets/musics/Michael Jackson - Billie Jean.mp3"
  }]

  export const EMPTY_QUESTION: Question = {
    questionId: 0,
    question: '',
    correctAnswers: [],
    answers: [],
    hints: [],
    audioPath: '',
  };
  