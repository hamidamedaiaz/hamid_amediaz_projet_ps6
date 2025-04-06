import { Component, OnInit,Input } from '@angular/core';
import {CommonModule}  from "@angular/common";
import {QuizItemComponent} from "../quiz-item/quiz-item.component";
import { FormsModule } from '@angular/forms';
import {Quiz} from "../../../../models/quiz.model";
import {QuizService} from "src/services/quiz-list.service";
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-quiz-app',
  standalone: true,
  imports: [
    CommonModule,
    QuizItemComponent,
    FormsModule
  ],
  templateUrl: './quiz-app.component.html',
  styleUrl: './quiz-app.component.scss'
})
export class QuizAppComponent implements OnInit {
  searchQuery: string = '';
  quizzes:Quiz[] = [];
  currentPage=this.currentPageService.getCurrentPage();

  @Input()
  context:String|undefined;

  constructor(private quizService: QuizService, private router:Router, private currentPageService:CurrentPageService) {
    console.log("Quizzes chargés :", this.quizzes);
  }

  ngOnInit(): void {
    this.quizService.quiz$.subscribe((quizzes:Quiz[]) => this.quizzes = quizzes)
  }


  filteredQuizzes() {
    return this.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  launchMultiGame(quiz:Quiz){
    this.router.navigate(['/multiplayer-game-setup'])
  }

  launchSoloGame(quiz:Quiz){
    console.log("Launching this quiz in singleplayer mode ", quiz);
    this.router.navigate(["/singleplayer-game"])
  }

}
