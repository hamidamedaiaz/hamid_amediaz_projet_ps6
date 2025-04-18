import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuizService} from "../../../../services/quiz-list.service";
import {NgOptimizedImage, CommonModule} from "@angular/common";
import {Quiz} from "../../../../models/quiz.model";
import {CurrentPageService } from 'src/services/currentPage.service';


@Component({
  selector: 'app-quiz-item',
  standalone: true,
  imports: [
    NgOptimizedImage, CommonModule
  ],
  templateUrl: './quiz-item.component.html',
  styleUrl: './quiz-item.component.scss'
})

export class QuizItemComponent {

  @Input() 
  quiz!:Quiz;

  @Input() 
  context?:String

  @Output()
  launchMultiGameEmitter: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  currentPage:String=this.currentPageService.getCurrentPage();

  constructor(private quizService: QuizService, private currentPageService: CurrentPageService) {
    console.log("current page: ",this.currentPage);
  }

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
