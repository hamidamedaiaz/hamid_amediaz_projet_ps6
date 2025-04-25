import { Injectable } from "@angular/core";
import { Question } from "src/models/question.model";
import { Quiz } from "src/models/quiz.model";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentQuizService {
  public currentQuiz: Quiz | null = null;
  private score: number = 0;
  private readonly CURRENT_QUIZ_KEY = 'current_quiz';
  private readonly CURRENT_SCORE_KEY = 'current_score';

  constructor(private localStorageService: LocalStorageService) {
    // Restaurer les données depuis localStorage au démarrage du service
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    // Récupérer le quiz et le score depuis le localStorage
    const savedQuiz = this.localStorageService.getItem(this.CURRENT_QUIZ_KEY);
    const savedScore = this.localStorageService.getItem(this.CURRENT_SCORE_KEY);
    
    if (savedQuiz) {
      this.currentQuiz = savedQuiz;
    }
    
    if (savedScore !== null) {
      this.score = savedScore;
    }
  }

  public setCurrentQuiz(quiz: Quiz) {
    this.currentQuiz = quiz;
    // Sauvegarder dans localStorage
    this.localStorageService.storeItem(this.CURRENT_QUIZ_KEY, JSON.stringify(quiz));
    console.log("current quiz: ", this.currentQuiz);
  }

  public setScore(value: number) {
    this.score = value;
    // Sauvegarder dans localStorage
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

  // Méthode pour réinitialiser le quiz en cours
  public resetCurrentQuiz(): void {
    this.currentQuiz = null;
    this.score = 0;
    this.localStorageService.removeItem(this.CURRENT_QUIZ_KEY);
    this.localStorageService.removeItem(this.CURRENT_SCORE_KEY);
  }
}