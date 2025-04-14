import { Component, Input } from '@angular/core';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
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

  private questions : Question[] = this.quiz.questions;

  private currentQuestionId: number = 0;

  public currentQuestion = this.questions[this.currentQuestionId];

  private score:number = 0;

  @Input()
  context: String|any;

  constructor(private currentQuizService:CurrentQuizService, private router:Router, private currentPageService:CurrentPageService) { }

  public nextQuestion() {
    //console.log(this.currentQuestionId, this.questions.length)
    if(this.currentQuestionId === this.questions.length - 1){
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

  public increaseScore(){
    this.score++;
    this.currentQuizService.setScore(this.score)
    if(this.currentQuestionId >= this.questions.length - 1){
      console.log('end of the game');
      this.router.navigate(["/quiz-scoreboard"]);
    } else if(this.currentPageService.getCurrentPage() === 'singleplayer-game') {
      this.nextQuestion();
    }
  }

}
