import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizResult } from '../models/quiz-result.model';
import { HttpClient } from '@angular/common/http';
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

  getQuizResultsByQuiz(quizId: number) {
    const quizResults = this.allResults.filter((quizResult) => {
      return quizResult.quizId === quizId
    })
    return quizResults;
  }

  getQuizResult(quizResultId: number): QuizResult {
    const quizResult = this.allResults.find((result) => result.id === quizResultId);
    if (quizResult) return quizResult;
    return QUIZ_RESULT_EMPTY;
  }

  sendQuizResult(quizResult: QuizResult) {
    this.http.post(this.apiUrl, quizResult).subscribe({
      next: () => {
        console.log(`New Quiz Result sent: ${quizResult.id}`);
        this.requestResult();
      },
      error: (err) => {
        console.error(`Failed to create Quiz Result ${quizResult.id} - ${err}`);
      }
    })

  }
  
}