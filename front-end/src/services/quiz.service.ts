import { Injectable } from "@angular/core";
import { Question } from "src/models/question.model";
import { Quiz } from "src/models/quiz.model";
import { LocalStorageService } from "./localstorage.service";
import { Answer } from "src/models/answer.model";
import { BehaviorSubject } from "rxjs";
import { EMPTY_QUESTION } from "src/mocks/question.mock"
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public quiz: Quiz | null = null;
  public question: Question | undefined
  public questionId:number = 0;
  private givenCorrectAnswers: Answer[] = [];
  private readonly QUIZ_KEY = 'current_quiz';
  private readonly GIVEN_ANSWERS = 'current_score';
  private readonly QUESTION_ID_KEY = '0';

  public question$: BehaviorSubject<Question> = new BehaviorSubject<Question>(EMPTY_QUESTION);

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.loadFromStorage();
    this.question = this.quiz?.questions[this.questionId];
    if(this.question) this.question$.next(this.question);
  }

  private loadFromStorage(): void {
    const savedQuiz = this.localStorageService.getItem(this.QUIZ_KEY);
    const savedGivenAnswers = this.localStorageService.getItem(this.GIVEN_ANSWERS);
    const savedQuestionId = this.localStorageService.getItem(this.QUESTION_ID_KEY);
    
    if (savedQuiz) {
      this.quiz = savedQuiz;
    }
    
    if (savedGivenAnswers !== null) {
      this.givenCorrectAnswers = savedGivenAnswers;
    }

    if(savedQuestionId){
      this.questionId = savedQuestionId;
    }
  }

  public increaseScore(answer: Answer){
    if(!this.givenCorrectAnswers.includes(answer)){
      this.givenCorrectAnswers.push(answer);
      this.localStorageService.removeItem(this.GIVEN_ANSWERS);
      this.localStorageService.storeItem(this.GIVEN_ANSWERS, JSON.stringify(this.givenCorrectAnswers));
    }
  }

  public setQuiz(quiz: Quiz) {
    this.quiz = quiz;
    this.localStorageService.storeItem(this.QUIZ_KEY, JSON.stringify(quiz));
    this.question = this.quiz.questions[this.questionId];
    this.question$.next(this.question);
    console.log("current quiz: ", this.quiz);
  }

  public getScore(): number {
    console.log(this.givenCorrectAnswers)
    return this.givenCorrectAnswers.length;
  }

  public getQuestions(): Question[] | null {
    if (this.quiz) {
      return this.quiz.questions;
    }
    return null;
  }

  public getNumberOfQuestions() {
    if(this.quiz) return this.quiz.questions.length;
    return null;
  }

  public resetCurrentQuiz(): void {
    this.quiz = null;
    this.givenCorrectAnswers = [];
    this.questionId = 0;
    this.localStorageService.removeItem(this.QUIZ_KEY);
    this.localStorageService.removeItem(this.GIVEN_ANSWERS);
  }

  public nextQuestion(){
    if (this.quiz && this.questionId >= this.quiz.questions.length - 1) {
      console.log("End of the Game");
      this.router.navigate(["/quiz-scoreboard"]);
    }
    else if (this.quiz && this.questionId < this.quiz.questions.length - 1) {
      this.questionId++;
      this.question = this.quiz.questions[this.questionId];
      this.question$.next(this.question);
      console.log("next question: ", this.question);
    }
  }

  public previousQuestion(){
    if (this.questionId > 0) {
      this.questionId--;
      this.question = this.quiz?.questions[this.questionId];
      if(this.question) this.question$.next(this.question);
      console.log("previous question: ", this.question);
    }
  }

}