import { Injectable } from "@angular/core";
import { Question } from "src/models/question.model";
import { Quiz } from "src/models/quiz.model";
import { LocalStorageService } from "./localstorage.service";
import { Answer } from "src/models/answer.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentQuizService {
  public currentQuiz: Quiz | null = null;
  private score: number = 0;
  private givenCorrectAnswers: Answer[] = [];
  private readonly CURRENT_QUIZ_KEY = 'current_quiz';
  private readonly CURRENT_SCORE_KEY = 'current_score';

  constructor(private localStorageService: LocalStorageService) {
    this.loadFromStorage();
    this.givenCorrectAnswers=[];
    this.score = 0;
  }

  private loadFromStorage(): void {
    const savedQuiz = this.localStorageService.getItem(this.CURRENT_QUIZ_KEY);
    const savedScore = this.localStorageService.getItem(this.CURRENT_SCORE_KEY);
    
    if (savedQuiz) {
      this.currentQuiz = savedQuiz;
    }
    
    if (savedScore !== null) {
      this.score = savedScore;
    }
  }

  public increaseScore(answer: Answer): Boolean{
    if(!this.givenCorrectAnswers.includes(answer)){
        this.score += 1;
        this.givenCorrectAnswers.push(answer);
        return true;
    }
    return false;
  }

  public setCurrentQuiz(quiz: Quiz) {
    this.currentQuiz = quiz;
    this.localStorageService.storeItem(this.CURRENT_QUIZ_KEY, JSON.stringify(quiz));
    console.log("current quiz: ", this.currentQuiz);
  }

  public setScore(value: number) {
    this.score = value;
    this.localStorageService.storeItem(this.CURRENT_SCORE_KEY, JSON.stringify(value));
  }

  public getScore(): number {
    return this.score;
  }

  public getQuestions(): Question[] | null {
    if (this.currentQuiz) {
      return this.currentQuiz.questions;
    }
    return null;
  }

  public getNumberOfQuestions() {
    if (this.currentQuiz) {
      return this.currentQuiz.questions.length;
    }
    return null;
  }



  public resetCurrentQuiz(): void {
    this.currentQuiz = null;
    this.score = 0;
    this.givenCorrectAnswers = [];
    this.localStorageService.removeItem(this.CURRENT_QUIZ_KEY);
    this.localStorageService.removeItem(this.CURRENT_SCORE_KEY);
  }
}