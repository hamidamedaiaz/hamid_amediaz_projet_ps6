import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizResult, QuestionResult } from '../models/quiz-result.model';
import { CurrentProfileService } from './currentProfile.service';
import { CurrentQuizService } from './current-quiz.service';
import { QUIZ_RESULTS_MOCK } from '../mocks/quiz-results.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  private currentResult: QuizResult | null = null;
  private results: QuizResult[] = QUIZ_RESULTS_MOCK;
  
  public results$: BehaviorSubject<QuizResult[]> = new BehaviorSubject<QuizResult[]>(this.results);
  public currentResult$: BehaviorSubject<QuizResult | null> = new BehaviorSubject<QuizResult | null>(this.currentResult);

  constructor(
    private currentProfileService: CurrentProfileService,
    private currentQuizService: CurrentQuizService
  ) {}

  saveQuizResult(result: QuizResult): void {
    this.results.push(result);
    this.results$.next(this.results);
    this.setCurrentResult(result);
  }

  createNewResult(
    score: number, 
    totalQuestions: number, 
    timeSpent: number, 
    hintsUsed: number,
    questionResults: QuestionResult[]
  ): QuizResult {
    const newResult: QuizResult = {
      id: this.generateNewId(),
      quiz: this.currentQuizService.currentQuiz!,
      profile: this.currentProfileService.getCurrentProfile(),
      date: new Date(),
      score,
      totalQuestions,
      timeSpent,
      hintsUsed,
      questionResults
    };
    
    return newResult;
  }

  getQuizResults(): Observable<QuizResult[]> {
    return this.results$;
  }

  getQuizResultById(resultId: number): QuizResult | null {
    return this.results.find(result => result.id === resultId) || null;
  }

  getResultsByQuizId(quizId: number): QuizResult[] {
    return this.results.filter(result => result.quiz.id === quizId);
  }

  getResultsByProfileId(profileId: number): QuizResult[] {
    return this.results.filter(result => result.profile.id === profileId);
  }

  getResultByProfileAndQuiz(profileId: number, quizId: number): QuizResult | null {
    return this.results.find(
      result => result.profile.id === profileId && result.quiz.id === quizId
    ) || null;
  }

  setCurrentResult(result: QuizResult): void {
    this.currentResult = result;
    this.currentResult$.next(this.currentResult);
  }

  private generateNewId(): number {
    return this.results.length > 0 
      ? Math.max(...this.results.map(result => result.id)) + 1 
      : 1;
  }

  calculatePercentage(score: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
  }

  calculateAverageTimePerQuestion(timeSpent: number, totalQuestions: number): number {
    if (totalQuestions === 0) return 0;
    return Math.round((timeSpent / totalQuestions) * 10) / 10; 
  }
}