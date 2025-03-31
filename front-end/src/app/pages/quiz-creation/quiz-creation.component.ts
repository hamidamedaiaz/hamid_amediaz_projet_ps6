import { Component } from '@angular/core';
import {ResponseComponent} from "../../components/quiz-creation/response/response.component";
import {QuestionComponent} from "../../components/quiz-creation/question/question.component";

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [
    ResponseComponent,
    QuestionComponent
  ],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.scss'
})
export class QuizCreationComponent {

}
