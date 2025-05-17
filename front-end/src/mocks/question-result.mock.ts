import { QuestionResult } from "src/models/question-result.model";
import { Answer } from "src/models/answer.model";
import { QUIZ_EXAMPLE } from "./quiz.mock";

function getAnswersIds(answers:Answer[]):number[]{
    let ids:number[] = []
    answers.forEach(element => {
        ids.push(element.id)
    });
    return ids;
}

export const QUESTION_RESULT: QuestionResult[] =
    [{
        quizId: 1,
        questionId: QUIZ_EXAMPLE.questions[0].id,
        answerIds: getAnswersIds(QUIZ_EXAMPLE.questions[0].answers),
        timeSpent: 15,
        numberOfHintsUsed: 3
    },
    {
        quizId: 1,
        questionId: QUIZ_EXAMPLE.questions[1].id,
        answerIds: getAnswersIds(QUIZ_EXAMPLE.questions[1].answers),
        timeSpent: 35,
        numberOfHintsUsed: 3
    },
    {
        quizId: 1,
        questionId: QUIZ_EXAMPLE.questions[2].id,
        answerIds: getAnswersIds(QUIZ_EXAMPLE.questions[2].answers),
        timeSpent: 27,
        numberOfHintsUsed: 3
    }
]