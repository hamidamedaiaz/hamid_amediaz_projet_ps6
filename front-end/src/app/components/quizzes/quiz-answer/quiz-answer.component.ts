import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from 'src/models/answer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-answer',
  standalone: true,
  imports: [QuizAnswerComponent, CommonModule],
  templateUrl: './quiz-answer.component.html',
  styleUrl: './quiz-answer.component.scss'
})
export class QuizAnswerComponent {
  
  @Input()
  answer:any;
  
  @Input()
  context:any;
  
  @Input()
  percent:any;

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();

  selectedAnswer(){
    this.answerSelected.emit(this.answer);
  }

  getPercent(){
    return this.percent;
  }
}
