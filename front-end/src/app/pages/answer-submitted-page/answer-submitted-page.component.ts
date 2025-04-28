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

  constructor(private router: Router, private quizService: QuizService){
    this.valideQuestionTimer = setTimeout(() => {
      this.showNextQuestion = true;
      this.correctAnswer = true;
      
    }, 3000);
    
    this.redirectionTimer = setTimeout(() =>{
      this.quizService.nextQuestion();
      this.router.navigate(["/multiplayer-game"])
    }, 6000)

  }
}
