import {Component, Input} from '@angular/core';
import {QuizService} from "../../../../services/quiz-list.service";
import {NgOptimizedImage} from "@angular/common";
import {Quiz} from "../../../../models/quiz.model";

@Component({
  selector: 'app-quiz-item',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './quiz-item.component.html',
  styleUrl: './quiz-item.component.scss'
})

export class QuizItemComponent {
  @Input() quiz!:Quiz;

  constructor(private quizService: QuizService) {}

  onEditClick(){
    this.quizService.selectQuizForEdition(this.quiz)
  }
}
