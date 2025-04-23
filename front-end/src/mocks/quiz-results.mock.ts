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

export const QUIZ_RESULTS: QuizResult[] = [
  {
    id: 1,
    quiz: {
      id: 1,
      title: 'Quiz Années 80',
      description: 'Test vos connaissances sur la musique des années 80',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[0], 
    date: new Date('2023-04-10'),
    score: 8,
    totalQuestions: 10,
    timeSpent: 300, 
    hintsUsed: 3,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 15,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 22,
        hintsUsed: 1
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        isCorrect: true,
        timeSpent: 18,
        hintsUsed: 0
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 9, answerContent: "Led Zeppelin" },
        isCorrect: false,
        timeSpent: 25,
        hintsUsed: 2
      }
    ]
  },
  {
    id: 2,
    quiz: {
      id: 1,
      title: 'Quiz Années 80',
      description: 'Test vos connaissances sur la musique des années 80',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[1], 
    date: new Date('2023-04-15'),
    score: 6,
    totalQuestions: 10,
    timeSpent: 350,
    hintsUsed: 5,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER1,
        isCorrect: false,
        timeSpent: 20,
        hintsUsed: 1
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 2, answerContent: "The Beatles" },
        isCorrect: false,
        timeSpent: 30,
        hintsUsed: 2
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        isCorrect: true,
        timeSpent: 25,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        isCorrect: true,
        timeSpent: 18,
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
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[0], 
    date: new Date('2023-04-20'),
    score: 9,
    totalQuestions: 10,
    timeSpent: 280,
    hintsUsed: 2,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 12,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 15,
        hintsUsed: 0
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        isCorrect: true,
        timeSpent: 18,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        isCorrect: true,
        timeSpent: 20,
        hintsUsed: 1
      }
    ]
  },
  {
    id: 4,
    quiz: {
      id: 3,
      title: 'Quiz Pop',
      description: 'Test vos connaissances sur la musique pop',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[2],
    date: new Date('2023-04-18'),
    score: 7,
    totalQuestions: 10,
    timeSpent: 320,
    hintsUsed: 4,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 14,
        hintsUsed: 1
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 19,
        hintsUsed: 0
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 5, answerContent: "The Wall" },
        isCorrect: false,
        timeSpent: 22,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 8, answerContent: "Fleetwood Mac" },
        isCorrect: false,
        timeSpent: 26,
        hintsUsed: 2
      }
    ]
  },
  {
    id: 5,
    quiz: {
      id: 1,
      title: 'Quiz Années 80',
      description: 'Test vos connaissances sur la musique des années 80',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[3], 
    date: new Date('2023-04-12'),
    score: 5,
    totalQuestions: 10,
    timeSpent: 380,
    hintsUsed: 6,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 17,
        hintsUsed: 1
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 3, answerContent: "The Rolling Stones" },
        isCorrect: false,
        timeSpent: 28,
        hintsUsed: 2
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 6, answerContent: "Wish You Were Here" },
        isCorrect: false,
        timeSpent: 32,
        hintsUsed: 2
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        isCorrect: true,
        timeSpent: 24,
        hintsUsed: 1
      }
    ]
  },
  
 
  {
    id: 6,
    quiz: {
      id: 3,
      title: 'Quiz Pop',
      description: 'Test vos connaissances sur la musique pop',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[0], 
    date: new Date('2023-05-05'),
    score: 7,
    totalQuestions: 10,
    timeSpent: 290,
    hintsUsed: 3,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 14,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 20,
        hintsUsed: 1
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 5, answerContent: "The Wall" },
        isCorrect: false,
        timeSpent: 25,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        isCorrect: true,
        timeSpent: 20,
        hintsUsed: 1
      }
    ]
  },
  
 
  {
    id: 7,
    quiz: {
      id: 2,
      title: 'Quiz Rock',
      description: 'Test vos connaissances sur le rock',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[1], 
    date: new Date('2023-05-02'),
    score: 8,
    totalQuestions: 10,
    timeSpent: 310,
    hintsUsed: 2,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 16,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 18,
        hintsUsed: 0
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        isCorrect: true,
        timeSpent: 22,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 8, answerContent: "Fleetwood Mac" },
        isCorrect: false,
        timeSpent: 26,
        hintsUsed: 1
      }
    ]
  },
  
  {
    id: 8,
    quiz: {
      id: 1,
      title: 'Quiz Années 80',
      description: 'Test vos connaissances sur la musique des années 80',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[4], 
    date: new Date('2023-04-25'),
    score: 9,
    totalQuestions: 10,
    timeSpent: 250,
    hintsUsed: 1,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 12,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 15,
        hintsUsed: 0
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        isCorrect: true,
        timeSpent: 16,
        hintsUsed: 0
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 9, answerContent: "Led Zeppelin" },
        isCorrect: false,
        timeSpent: 20,
        hintsUsed: 1
      }
    ]
  },
  
  
  {
    id: 9,
    quiz: {
      id: 2,
      title: 'Quiz Rock',
      description: 'Test vos connaissances sur le rock',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[4], 
    date: new Date('2023-05-03'),
    score: 8,
    totalQuestions: 10,
    timeSpent: 270,
    hintsUsed: 2,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 13,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 16,
        hintsUsed: 0
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 5, answerContent: "The Wall" },
        isCorrect: false,
        timeSpent: 19,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        isCorrect: true,
        timeSpent: 18,
        hintsUsed: 1
      }
    ]
  },
  
  
  {
    id: 10,
    quiz: {
      id: 2,
      title: 'Quiz Rock',
      description: 'Test vos connaissances sur le rock',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[2], 
    date: new Date('2023-05-10'),
    score: 6,
    totalQuestions: 10,
    timeSpent: 340,
    hintsUsed: 4,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 15,
        hintsUsed: 1
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 20,
        hintsUsed: 1
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 6, answerContent: "Wish You Were Here" },
        isCorrect: false,
        timeSpent: 25,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 9, answerContent: "Led Zeppelin" },
        isCorrect: false,
        timeSpent: 22,
        hintsUsed: 1
      }
    ]
  },
  
  {
    id: 11,
    quiz: {
      id: 2,
      title: 'Quiz Rock',
      description: 'Test vos connaissances sur le rock',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[3], 
    date: new Date('2023-05-08'),
    score: 7,
    totalQuestions: 10,
    timeSpent: 320,
    hintsUsed: 3,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 16,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 19,
        hintsUsed: 1
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 5, answerContent: "The Wall" },
        isCorrect: false,
        timeSpent: 24,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        isCorrect: true,
        timeSpent: 21,
        hintsUsed: 1
      }
    ]
  },
  
  {
    id: 12,
    quiz: {
      id: 3,
      title: 'Quiz Pop',
      description: 'Test vos connaissances sur la musique pop',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[4], 
    date: new Date('2023-05-15'),
    score: 7,
    totalQuestions: 10,
    timeSpent: 300,
    hintsUsed: 3,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER2,
        isCorrect: true,
        timeSpent: 15,
        hintsUsed: 0
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 17,
        hintsUsed: 1
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        isCorrect: true,
        timeSpent: 20,
        hintsUsed: 1
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 9, answerContent: "Led Zeppelin" },
        isCorrect: false,
        timeSpent: 22,
        hintsUsed: 1
      }
    ]
  },
  
  {
    id: 13,
    quiz: {
      id: 3,
      title: 'Quiz Pop',
      description: 'Test vos connaissances sur la musique pop',
      questions: [QUESTION, ...QUESTIONS]
    },
    profile: PROFILE_LIST[3], 
    date: new Date('2023-05-12'),
    score: 6,
    totalQuestions: 10,
    timeSpent: 350,
    hintsUsed: 5,
    questionResults: [
      {
        questionId: 0,
        question: 'Quel est l\'auteur de la chanson Billie Jean ?',
        correctAnswer: ANSWERS.ANSWER2,
        userAnswer: ANSWERS.ANSWER1,
        isCorrect: false,
        timeSpent: 18,
        hintsUsed: 1
      },
      {
        questionId: 101,
        question: "Quel groupe a sorti 'Bohemian Rhapsody' en 1975 ?",
        correctAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        userAnswer: { questionId: 101, answerId: 1, answerContent: "Queen" },
        isCorrect: true,
        timeSpent: 22,
        hintsUsed: 1
      },
      {
        questionId: 102,
        question: "Quel album des Pink Floyd est sorti en 1973 ?",
        correctAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        userAnswer: { questionId: 102, answerId: 4, answerContent: "Dark Side of the Moon" },
        isCorrect: true,
        timeSpent: 25,
        hintsUsed: 2
      },
      {
        questionId: 103,
        question: "Qui a chanté 'Hotel California' en 1976 ?",
        correctAnswer: { questionId: 103, answerId: 7, answerContent: "The Eagles" },
        userAnswer: { questionId: 103, answerId: 8, answerContent: "Fleetwood Mac" },
        isCorrect: false,
        timeSpent: 26,
        hintsUsed: 1
      }
    ]
  }
];

export const MONTHLY_STATS: MonthlyStatsCollection = {
  players: {
    1: [ 
      { month: 'Jan', score: 68, hintUsage: 45, responseTime: 18, accuracy: 72 },
      { month: 'Fév', score: 72, hintUsage: 40, responseTime: 17, accuracy: 75 },
      { month: 'Mar', score: 78, hintUsage: 35, responseTime: 16, accuracy: 79 },
      { month: 'Avr', score: 85, hintUsage: 30, responseTime: 15, accuracy: 82 },
      { month: 'Mai', score: 87, hintUsage: 28, responseTime: 14, accuracy: 86 },
      { month: 'Juin', score: 90, hintUsage: 25, responseTime: 13, accuracy: 88 }
    ],
    2: [ 
      { month: 'Jan', score: 65, hintUsage: 50, responseTime: 20, accuracy: 68 },
      { month: 'Fév', score: 68, hintUsage: 48, responseTime: 19, accuracy: 70 },
      { month: 'Mar', score: 70, hintUsage: 45, responseTime: 18, accuracy: 72 },
      { month: 'Avr', score: 73, hintUsage: 42, responseTime: 17, accuracy: 75 },
      { month: 'Mai', score: 76, hintUsage: 40, responseTime: 16, accuracy: 78 },
      { month: 'Juin', score: 80, hintUsage: 38, responseTime: 15, accuracy: 82 }
    ],
    3: [ 
      { month: 'Jan', score: 60, hintUsage: 55, responseTime: 22, accuracy: 65 },
      { month: 'Fév', score: 64, hintUsage: 52, responseTime: 21, accuracy: 68 },
      { month: 'Mar', score: 68, hintUsage: 48, responseTime: 20, accuracy: 70 },
      { month: 'Avr', score: 73, hintUsage: 45, responseTime: 19, accuracy: 74 },
      { month: 'Mai', score: 77, hintUsage: 42, responseTime: 18, accuracy: 78 },
      { month: 'Juin', score: 82, hintUsage: 38, responseTime: 17, accuracy: 80 }
    ],
    4: [ 
      { month: 'Jan', score: 55, hintUsage: 60, responseTime: 24, accuracy: 60 },
      { month: 'Fév', score: 58, hintUsage: 58, responseTime: 23, accuracy: 62 },
      { month: 'Mar', score: 62, hintUsage: 55, responseTime: 22, accuracy: 65 },
      { month: 'Avr', score: 66, hintUsage: 52, responseTime: 21, accuracy: 68 },
      { month: 'Mai', score: 70, hintUsage: 50, responseTime: 20, accuracy: 72 },
      { month: 'Juin', score: 75, hintUsage: 48, responseTime: 19, accuracy: 76 }
    ],
    5: [ 
      { month: 'Jan', score: 70, hintUsage: 40, responseTime: 17, accuracy: 75 },
      { month: 'Fév', score: 73, hintUsage: 38, responseTime: 16, accuracy: 77 },
      { month: 'Mar', score: 76, hintUsage: 35, responseTime: 15, accuracy: 80 },
      { month: 'Avr', score: 80, hintUsage: 32, responseTime: 14, accuracy: 83 },
      { month: 'Mai', score: 85, hintUsage: 30, responseTime: 13, accuracy: 86 },
      { month: 'Juin', score: 88, hintUsage: 28, responseTime: 12, accuracy: 90 }
    ]
  }
};