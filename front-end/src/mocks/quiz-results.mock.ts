import { QuizResult } from '../models/quiz-result.model';
import { PROFILE_LIST } from './profile-list.mock';
import { QUESTION } from './question.mock';
import * as ANSWERS from './answer.mock';

export const QUIZ_RESULTS_MOCK: QuizResult[] = [
  {
    id: 1,
    quiz: {
      id: 1,
      title: 'Quiz Années 80',
      description: 'Test vos connaissances sur la musique des années 80',
      questions: [QUESTION]
    },
    profile: PROFILE_LIST[0],
    date: new Date('2023-04-10'),
    score: 8,
    totalQuestions: 10,
    timeSpent: 300,
    hintsUsed: 3,
    questionResults: [
      {
        questionId: 1,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 15,
        hintsUsed: 0
      }
    ]
  },
  {
    id: 2,
    quiz: {
      id: 1,
      title: 'Quiz Années 80',
      description: 'Test vos connaissances sur la musique des années 80',
      questions: [QUESTION]
    },
    profile: PROFILE_LIST[1], 
    date: new Date('2023-04-15'),
    score: 6,
    totalQuestions: 10,
    timeSpent: 350, 
    hintsUsed: 5,
    questionResults: [
      {
        questionId: 1,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER1,
        isCorrect: false,
        timeSpent: 20,
        hintsUsed: 1
      }
    ]
  },
  {
    id: 3,
    quiz: {
      id: 2,
      title: 'Quiz Rock',
      description: 'Test vos connaissances sur le rock',
      questions: [QUESTION]
    },
    profile: PROFILE_LIST[0], 
    date: new Date('2023-04-20'),
    score: 9,
    totalQuestions: 10,
    timeSpent: 280,
    hintsUsed: 2,
    questionResults: [
      {
        questionId: 1,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 12,
        hintsUsed: 0
      }
    ]
  }
];