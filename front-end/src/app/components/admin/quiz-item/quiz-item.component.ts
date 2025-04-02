import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output()
  launchMultiGameEmitter: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private quizService: QuizService) {}

  onEditClick(){
    this.quizService.selectQuizForEdition(this.quiz)
  }

  onDeleteClick(){
    console.log("Delete Quiz")
  }

  launchMultiGame(){
    return this.launchMultiGameEmitter.emit(this.quiz);
  }
}
