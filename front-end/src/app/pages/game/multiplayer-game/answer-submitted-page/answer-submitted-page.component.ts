import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-answer-submitted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer-submitted-page.component.html',
  styleUrl: './answer-submitted-page.component.scss'
})
export class AnswerSubmittedPageComponent {

  public showNextQuestion: Boolean = false;

  public correctAnswer: Boolean = false;

  private valideQuestionTimer; 

  private redirectionTimer;

  private VALID_QUESTION_TIME:number = 1500;

  private REDIRECTION_TIME:number = 3000;

  constructor(private router: Router, private quizService: QuizService){
    this.valideQuestionTimer = setTimeout(() => {
      this.showNextQuestion = true;
      this.correctAnswer = true;
    }, this.VALID_QUESTION_TIME);
    
    this.redirectionTimer = setTimeout(() =>{
      this.router.navigate(["/multiplayer-game"])
      this.quizService.nextQuestion();
    }, this.REDIRECTION_TIME);
  }
}
