import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Quiz} from "../models/quiz.model";
import {AdminComponent} from "../app/pages/admin/admin.component";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = '/assets/mock/quizzes.json';
  public quiz: Quiz[] = [];
  public quiz$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);
  public selectedEditQuiz$ = new BehaviorSubject<Quiz | null>(null);

  constructor(private http: HttpClient) {
    this.getQuizzes()
  }

  public getQuizzes(): void {
    this.http.get<Quiz[]>(this.apiUrl).subscribe((quizzes:Quiz[]) => {
        this.quiz$.next(quizzes)
      }
    )
  }

  public selectQuizForEdition(quiz: Quiz): void {
    this.selectedEditQuiz$.next(quiz);
    console.log("Edit Quiz Pressed : " + quiz.id + ", " + quiz.title);
  }

}
