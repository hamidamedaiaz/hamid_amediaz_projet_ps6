import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { QuizResult } from "src/models/quiz-result.model";
import { Quiz } from "src/models/quiz.model";
import { QuizService } from "./quiz.service";
import { HttpClient } from "@angular/common/http";
import { QuestionResult } from "src/models/question-result.model";
import { Question } from "src/models/question.model";

@Injectable({
  providedIn: 'root'
})

export class ComputeStatisticService {

  constructor() { }

  public getAverageTime(questionResults: QuestionResult[]) {
    let totalTime = 0;
    questionResults.forEach(element => {
      totalTime += element.timeSpent;
    });
    return Math.floor(totalTime / questionResults.length)
  }

  public getAverageHintUsed(questionResults: QuestionResult[]): number {
    let numberOfHintsUsed = 0;
    questionResults.forEach(element => {
      numberOfHintsUsed += element.numberOfHintsUsed;
    });
    return Math.floor(numberOfHintsUsed / questionResults.length)
  }


  public getAverageNumberOfTries(questionResults: QuestionResult[]): number {
    let numberOfAnswersSubmitted = 0;
    questionResults.forEach(element => {
      numberOfAnswersSubmitted += element.answerIds.length;
    });
    return Math.floor(numberOfAnswersSubmitted / questionResults.length)
  }

  public getTotalHintUsed(questionResults: QuestionResult[]): number {
    let hintCounter: number = 0;
    questionResults.forEach(element => {
      hintCounter += element.numberOfHintsUsed;
    })
    return hintCounter;
  }

  public isQuestionCorrect(quiz: Quiz, questionResult: QuestionResult): boolean {
    if (quiz.id != -1) {  //Check if the quiz is valid

      let question = quiz.questions.find((question) => question.id === questionResult.questionId);
      if (!question) { console.log("Error - Question Not Found "); return false; }
      const correctAnswerIds: number[] = question.answers  //Retrieve only correct answer Ids
        .filter((answer) => answer.isCorrect)
        .map((answer) => answer.id)

      if (correctAnswerIds.every((id) => questionResult.answerIds.includes(id))) return true;

    }
    return false;
  }

  public getPercentages(score: number, numberOfQuestions: number): number {
    return Math.floor((score / numberOfQuestions) * 100);
  }

  public getScore(quiz:Quiz, questionResults:QuestionResult[]){
    let score = 0;
    questionResults.forEach((question) => {
      if(this.isQuestionCorrect(quiz, question)) score ++;
    })
    return score;
  }




}
