import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizResult } from '../models/quiz-result.model';
import { HttpClient } from '@angular/common/http';
import { QUIZ_RESULT_EMPTY } from 'src/mocks/quiz-results.mock';
import { ProfileService } from './profile.service';
import { Profile } from 'src/models/profile.model';


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

export class QuizResultService implements OnInit{

  private allResults: QuizResult[] = [];

  private apiUrl: string = "http://localhost:9428/api/quiz-results/"

  public results$: BehaviorSubject<QuizResult[]> = new BehaviorSubject<QuizResult[]>([]);

  constructor(
    private http: HttpClient, private profileService:ProfileService) {
    this.requestResult();
  }
  ngOnInit(): void {
    this.requestResult();
  }

  private requestResult() {
    this.http.get<QuizResult[]>(this.apiUrl).subscribe((quizResults) => {
      this.allResults = quizResults;
      this.results$.next(this.allResults);
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

  deleteQuizResult(quizResultIndex: number) {
    this.http.delete(this.apiUrl +"/"+quizResultIndex ).subscribe({
      next:(res) => {
        this.allResults = this.allResults.filter((result) => {result.id !== quizResultIndex})
        this.requestResult();
      },
      error: (err) => console.error("[SERVER ERROR] - ", err)
    });
  }

  getProfilesInSession(sessionId:number){
    const profileIds:number[] = []
    this.allResults.filter((quizResult) => {
      if(quizResult.sessionId === sessionId) profileIds.push(quizResult.profileId);
    })
    return this.profileService.getProfiles(profileIds);

  }

}
