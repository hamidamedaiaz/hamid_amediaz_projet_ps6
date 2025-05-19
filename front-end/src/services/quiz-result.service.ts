import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizResult } from '../models/quiz-result.model';
import { QuestionResult } from "src/models/question-result.model"
import { CurrentProfileService } from './currentProfile.service';
import { QuizService } from './quiz.service';
import { HttpClient } from '@angular/common/http';
import { GamemodeService } from './gamemode.service';
import { Gamemode } from 'src/models/gamemode.model';
import { QUIZ_RESULT_EMPTY } from 'src/mocks/quiz-results.mock';


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
  private currentResult: QuizResult[] = [];
  private allResults: QuizResult[] = [];

  private apiUrl: string = "http://localhost:9428/api/quiz-results/"

  public results$: BehaviorSubject<QuizResult[]> = new BehaviorSubject<QuizResult[]>([]);


  constructor(
    private http: HttpClient) {
    this.requestResult()
  }


  private requestResult() {
    this.http.get<QuizResult[]>(this.apiUrl).subscribe((quizResults) => {
      this.allResults = quizResults;
    })
  }

  getPlayerMonthlyStats(profileId: number): MonthlyStatsData[] { return []; }

  getQuizResultsByProfile(profileId: number) {
    const quizResults = this.allResults.filter(
      (quizResult) => quizResult.profileId === profileId
    );
    return quizResults
  }

  getQuizResultsByQuiz(quizId:number){
    const quizResults = this.allResults.filter((quizResult) => {
      quizResult.quizId === quizId
    })
    return quizResults;
  }

  getQuizResult(quizResultId: number): QuizResult {
    const quizResult = this.allResults.find((result) => result.id === quizResultId);
    if (quizResult) return quizResult;
    return QUIZ_RESULT_EMPTY;
  }

  


  // saveQuizResult(result: QuizResult): void {
  //   this.results.push(result);
  //   this.results$.next(this.results);
  //   this.setCurrentResult(result);
  // }

  // createNewResult(
  //   score: number,
  //   totalQuestions: number,
  //   timeSpent: number,
  //   hintsUsed: number,
  //   questionResults: QuestionResult[],
  //   gamemode:Gamemode = this.gamemodeService.getCurrentGamemode()
  // ): QuizResult {
  //   const newResult: QuizResult = {
  //     quizSessionId: 0,
  //     quiz: this.currentQuizService.quiz!,
  //     profile: this.currentProfileService.getCurrentProfile(),
  //     date: Date.now(),
  //     score,
  //     totalQuestions,
  //     timeSpent,
  //     hintsUsed,
  //     questionResults,
  //     gamemode
  //   };

  //   return newResult;
  // }

  // getQuizResults(): Observable<QuizResult[]> { return this.results$; }

  // getQuizResultById(quizResultId: number) {
  //   try {
  //     this.http.get<QuizResult>(this.apiUrl + "/" + quizResultId).subscribe((quizResult) => {
  //       return quizResult;
  //     })
  //   } catch (err) { console.log(err); }
  //   return null; 
  // }

  // getResultsByQuizId(quizId: number): QuizResult[] { 
  //   return this.results.filter(result => result.quiz.id === quizId);
  // }

  // getResultsByProfileId(profileId: number): QuizResult[] {
  //   return this.results.filter(result => result.profile.id === profileId);
  // }

  // getResultByProfileAndQuiz(profileId: number, quizId: number): QuizResult | null {
  //   return this.results.find(
  //     result => result.profile.id === profileId && result.quiz.id === quizId
  //   ) || null;
  // }

  // setCurrentResult(result: QuizResult): void {
  //   this.currentResult = result;
  //   this.currentResult$.next(this.currentResult);
  // }

  // calculatePercentage(score: number, total: number): number {
  //   if (total === 0) return 0;
  //   return Math.round((score / total) * 100);
  // }

  // calculateAverageTimePerQuestion(timeSpent: number, totalQuestions: number): number {
  //   if (totalQuestions === 0) return 0;
  //   return Math.round((timeSpent / totalQuestions) * 10) / 10;
  // }



  // getPlayerTotalStats(profileId: number) {
  //   const playerResults = this.getResultsByProfileId(profileId);

  //   if (playerResults.length === 0) {
  //     return {
  //       totalGames: 0,
  //       bestScore: 0,
  //       averageScore: 0,
  //       totalHintsUsed: 0,
  //       averageTimePerQuestion: 0,
  //       correctAnswersPercent: 0,
  //       incorrectAnswersPercent: 0
  //     };
  //   }

  //   const totalGames = playerResults.length;
  //   const bestScore = Math.max(...playerResults.map(r => this.calculatePercentage(r.score, r.totalQuestions)));
  //   const averageScore = Math.round(
  //     playerResults.reduce((sum, r) => sum + this.calculatePercentage(r.score, r.totalQuestions), 0) / totalGames
  //   );
  //   const totalHintsUsed = playerResults.reduce((sum, r) => sum + r.hintsUsed, 0);

  //   let totalCorrectAnswers = 0;
  //   let totalQuestions = 0;
  //   let totalTimeSpent = 0;

  //   playerResults.forEach(result => {
  //     totalCorrectAnswers += result.score;
  //     totalQuestions += result.totalQuestions;
  //     totalTimeSpent += result.timeSpent;
  //   });

  //   const averageTimePerQuestion = totalQuestions > 0
  //     ? Math.round((totalTimeSpent / totalQuestions) * 10) / 10 : 0;

  //   const correctAnswersPercent = totalQuestions > 0
  //     ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0;

  //   const incorrectAnswersPercent = 100 - correctAnswersPercent;

  //   return {
  //     totalGames,
  //     bestScore,
  //     averageScore,
  //     totalHintsUsed,
  //     averageTimePerQuestion,
  //     correctAnswersPercent,
  //     incorrectAnswersPercent
  //   };
  // }

  // getQuizHistoryForPlayer(profileId: number) {
  //   const playerResults = this.getResultsByProfileId(profileId);
  //   return playerResults.map(result => ({
  //     quizId: result.quiz.id,
  //     quizTitle: result.quiz.title,
  //     date: result.date,
  //     score: result.score,
  //     totalQuestions: result.totalQuestions,
  //     percentageCorrect: this.calculatePercentage(result.score, result.totalQuestions),
  //     timeSpent: Math.round(result.timeSpent / result.totalQuestions), hintsUsed: result.hintsUsed
  //   })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // }

}