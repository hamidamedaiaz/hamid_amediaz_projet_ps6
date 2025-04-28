import { Component, Input } from '@angular/core';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { Answer } from 'src/models/answer.model';
import { QuizService } from 'src/services/quiz.service';
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuizQuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  private quiz: Quiz | any = this.currentQuizService.quiz;

  private questions: Question[] = this.quiz.questions;

  private currentQuestionId: number = 0;

  public currentQuestion = this.questions[this.currentQuestionId];

  private givenCorrectAnswers: Answer[] = []

  @Input()
  context: String | any;

  constructor(private currentQuizService: QuizService, private router: Router) {}

}
