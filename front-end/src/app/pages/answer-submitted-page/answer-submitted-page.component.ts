import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'

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

  private redirectionTimer; 

  constructor(){
    this.redirectionTimer = setTimeout(() => {
      this.showNextQuestion = true;
      this.correctAnswer = true;
    }, 3000);
  }
}
