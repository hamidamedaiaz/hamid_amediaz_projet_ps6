import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizResult, QuestionResult } from '../models/quiz-result.model';
import { CurrentProfileService } from './currentProfile.service';
import { QuizService } from './quiz.service';


export interface MonthlyStatsData {
  month: string;
  score: number;
  hintUsage: number;
  responseTime: number;
  accuracy: number;
}

@Injectable({
  providedIn: 'root'
})

export class QuizResultService {
  private currentResult: QuizResult | null = null;
  private results: QuizResult[] = [];
  
  public results$: BehaviorSubject<QuizResult[]> = new BehaviorSubject<QuizResult[]>(this.results);
  public currentResult$: BehaviorSubject<QuizResult | null> = new BehaviorSubject<QuizResult | null>(this.currentResult);

  constructor(
    private currentProfileService: CurrentProfileService,
    private currentQuizService: QuizService
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
      quiz: this.currentQuizService.quiz!,
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

  getPlayerMonthlyStats(profileId: number): MonthlyStatsData[] {

    return [];
  }

  

  getPlayerTotalStats(profileId: number) {
    const playerResults = this.getResultsByProfileId(profileId);
    
    if (playerResults.length === 0) {
      return {
        totalGames: 0,
        bestScore: 0,
        averageScore: 0,
        totalHintsUsed: 0,
        averageTimePerQuestion: 0,
        correctAnswersPercent: 0,
        incorrectAnswersPercent: 0
      };
    }

    const totalGames = playerResults.length;
    const bestScore = Math.max(...playerResults.map(r => this.calculatePercentage(r.score, r.totalQuestions)));
    const averageScore = Math.round(
      playerResults.reduce((sum, r) => sum + this.calculatePercentage(r.score, r.totalQuestions), 0) / totalGames
    );
    const totalHintsUsed = playerResults.reduce((sum, r) => sum + r.hintsUsed, 0);
    
    let totalCorrectAnswers = 0;
    let totalQuestions = 0;
    let totalTimeSpent = 0;

    playerResults.forEach(result => {
      totalCorrectAnswers += result.score;
      totalQuestions += result.totalQuestions;
      totalTimeSpent += result.timeSpent;
    });

    const averageTimePerQuestion = totalQuestions > 0 
      ? Math.round((totalTimeSpent / totalQuestions) * 10) / 10 
      : 0;
    
    const correctAnswersPercent = totalQuestions > 0 
      ? Math.round((totalCorrectAnswers / totalQuestions) * 100) 
      : 0;
    
    const incorrectAnswersPercent = 100 - correctAnswersPercent;

    return {
      totalGames,
      bestScore,
      averageScore,
      totalHintsUsed,
      averageTimePerQuestion,
      correctAnswersPercent,
      incorrectAnswersPercent
    };
  }

  getQuizHistoryForPlayer(profileId: number) {
    const playerResults = this.getResultsByProfileId(profileId);
    
    return playerResults.map(result => ({
      quizId: result.quiz.id,
      quizTitle: result.quiz.title,
      date: result.date.toLocaleDateString(),
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentageCorrect: this.calculatePercentage(result.score, result.totalQuestions),
      timeSpent: Math.round(result.timeSpent / result.totalQuestions),       hintsUsed: result.hintsUsed
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}