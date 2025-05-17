import { QuizResult } from "src/models/quiz-result.model"
import { QUIZ_EXAMPLE } from "./quiz.mock"
import  { GUEST_PROFILE } from "./profile-list.mock"
import { QUESTION_RESULT } from "./question-result.mock"
import { GAMEMODE_SOLO } from "./gamemode-list.mock"

export const QUIZ_RESULT_EMPTY :QuizResult = {
    quizSessionId: 0,
    quiz: QUIZ_EXAMPLE,
    profile: GUEST_PROFILE,
    date: Date.now(),
    score: 0,
    totalQuestions: 0,
    timeSpent: 0,
    hintsUsed: 0,
    questionResults: QUESTION_RESULT,
    gamemode:GAMEMODE_SOLO
}