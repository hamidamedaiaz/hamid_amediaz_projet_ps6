import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizListService {
  private apiUrl = 'http://localhost:9428/api/quizzes';
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);
  public selectedEditQuiz$ = new BehaviorSubject<Quiz | null>(null);

  constructor(private http: HttpClient) {
    this.getQuizzes();
  }

  public getQuizzes(): void {
    this.http.get<Quiz[]>(this.apiUrl).subscribe((quizzes: Quiz[]) => {
      this.quizzes$.next(quizzes)
    });
  }

  public createQuiz(): void {
    const newQuiz: Quiz = {
      id: Date.now(),
      title: '',
      description: '',
      questions: []
    };
    this.selectedEditQuiz$.next(newQuiz);
  }

  public selectQuizForEdition(quiz: Quiz): void {
    this.selectedEditQuiz$.next(quiz);
    console.log("Edit Quiz Pressed : " + quiz.id + ", " + quiz.title);
  }

}
