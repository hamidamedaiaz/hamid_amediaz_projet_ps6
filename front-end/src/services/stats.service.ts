import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})

export class StatsService {

  public profileId$ = new BehaviorSubject<number>(-1);
  public quizSessionId$ = new BehaviorSubject<number>(-1);
  public quizId$ = new BehaviorSubject<number>(-1);

  private PROFILE_ID_KEY: string = "PROFILE_ID_KEY";
  private QUIZ_SESSION_ID_KEY: string = "QUIZ_SESSION_ID_KEY";
  private QUIZ_ID_KEY: string = "QUIZ_ID_KEY";

  constructor(private localStorageService: LocalStorageService) { this.loadFromStorage(); }

  public selectProfile(id: number) {
    this.profileId$.next(id); 
    this.localStorageService.storeItem(this.PROFILE_ID_KEY, JSON.stringify(id));
  }

  public selectQuizSession(id: number) { 
    this.quizSessionId$.next(id);
    this.localStorageService.storeItem(this.QUIZ_SESSION_ID_KEY, JSON.stringify(id));
   }

  public selectQuiz(id: number) { 
    this.quizId$.next(id);
    this.localStorageService.storeItem(this.QUIZ_ID_KEY, JSON.stringify(id));
  }

  private loadFromStorage(): void {
    const savedProfileId = this.localStorageService.getItem(this.PROFILE_ID_KEY);
    const savedQuizSessionId = this.localStorageService.getItem(this.QUIZ_SESSION_ID_KEY);
    const savedQuizId = this.localStorageService.getItem(this.QUIZ_ID_KEY);

    if (savedProfileId) this.profileId$.next(savedProfileId);
    if (savedQuizSessionId) this.quizSessionId$ = savedQuizSessionId;
    if (savedQuizId) this.quizId$ = savedQuizId;

  }

}
