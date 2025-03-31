import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Quiz} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = '/assets/mock/quizzes.json';
  public quiz: Quiz[] = [];
  public quiz$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);

  constructor(private http: HttpClient) {
    this.getQuizzes();
  }

  getQuizzes(): void {
    this.http.get<Quiz[]>(this.apiUrl).subscribe((quizzes:Quiz[]) => {
        this.quiz$.next(quizzes)
      }
    )
  }

}
