import { Quiz } from "src/models/quiz.model";
import { EMPTY_QUESTION } from "src/mocks/question.mock"

export const EMPTY_QUIZ: Quiz = {
    "id": -1,
    "title": "Empty Quiz",
    "questions": []
}

export const QUIZ_EXAMPLE: Quiz = {
    "id": 1,
    "title": "Quiz Rock des années 70-80",
    "questions": [
      {
        "id": 101,
        "question": "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        "answers": [
          {
            "questionId": 101,
            "id": 2,
            "answerContent": "The Beatles",
            "isCorrect": false
          },
          {
            "questionId": 101,
            "id": 3,
            "answerContent": "The Rolling Stones",
            "isCorrect": false
          },
          {
            "questionId": 101,
            "id": 4,
            "answerContent": "Genesis",
            "isCorrect": false
          },
          {
            "questionId": 101,
            "id": 1,
            "answerContent": "Queen",
            "isCorrect": true
          }
        ],
        "hints": [
          "Le leader du groupe était Freddie Mercury"
        ],
        "audioPath": "assets/musics/Michael Jackson - Billie Jean.mp3"
      },
      {
        "id": 102,
        "question": "Quel album des Pink Floyd est sorti en 1973 ?",
        "answers": [
          {
            "questionId": 102,
            "id": 5,
            "answerContent": "The Wall",
            "isCorrect": false
          },
          {
            "questionId": 102,
            "id": 6,
            "answerContent": "Wish You Were Here",
            "isCorrect": false
          },
          {
            "questionId": 102,
            "id": 7,
            "answerContent": "Animals",
            "isCorrect": false
          },
          {
            "questionId": 102,
            "id": 4,
            "answerContent": "Dark Side of the Moon",
            "isCorrect": true
          }
        ],
        "hints": [
          "La pochette de l'album représente un prisme"
        ],
        "audioPath": "assets/musics/Michael Jackson - Billie Jean.mp3"
      },
      {
        "id": 103,
        "question": "Qui a chanté 'Hotel California' en 1976 ?",
        "answers": [
          {
            "questionId": 103,
            "id": 8,
            "answerContent": "Fleetwood Mac",
            "isCorrect": false
          },
          {
            "questionId": 103,
            "id": 9,
            "answerContent": "Led Zeppelin",
            "isCorrect": false
          },
          {
            "questionId": 103,
            "id": 10,
            "answerContent": "Creedence Clearwater Revival",
            "isCorrect": false
          },
          {
            "questionId": 103,
            "id": 7,
            "answerContent": "The Eagles",
            "isCorrect": true
          }
        ],
        "hints": [
          "Le groupe est connu pour son style country rock"
        ],
        "audioPath": "assets/musics/Michael Jackson - Billie Jean.mp3"
      }
    ]
  }
