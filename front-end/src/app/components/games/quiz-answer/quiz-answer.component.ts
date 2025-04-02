import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-quiz-answer',
  standalone: true,
  imports: [QuizAnswerComponent],
  templateUrl: './quiz-answer.component.html',
  styleUrl: './quiz-answer.component.scss'
})
export class QuizAnswerComponent {
  @Input()
  answer:any;

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();

  selectedAnswer(){
    this.answerSelected.emit(this.answer);
  }
}
