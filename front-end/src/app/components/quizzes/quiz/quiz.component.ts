import { Component, Input } from '@angular/core';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { Answer } from 'src/models/answer.model';
import { CurrentQuizService } from 'src/services/current-quiz.service';
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

  private quiz: Quiz | any = this.currentQuizService.currentQuiz;

  private questions: Question[] = this.quiz.questions;

  private currentQuestionId: number = 0;

  public currentQuestion = this.questions[this.currentQuestionId];

  private givenCorrectAnswers: Answer[] = []

  @Input()
  context: String | any;

  constructor(private currentQuizService: CurrentQuizService, private router: Router) {}

  public nextQuestion() {
    if (this.currentQuestionId >= this.questions.length - 1) {
      console.log("End of the Game");
      this.router.navigate(["/quiz-scoreboard"]);
    }
    else if (this.currentQuestionId < this.questions.length - 1) {
      this.currentQuestionId++;
      this.currentQuestion = this.questions[this.currentQuestionId];
      console.log("next question: ", this.currentQuestion);
    }
  }

  public previousQuestion() {
    if (this.currentQuestionId > 0) {
      this.currentQuestionId--;
      this.currentQuestion = this.questions[this.currentQuestionId];
      console.log("previous question: ", this.currentQuestion);
    }
  }

  public getScore(): number {
    return this.givenCorrectAnswers.length
  }

}
