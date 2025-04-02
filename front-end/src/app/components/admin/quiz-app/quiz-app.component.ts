import { Component, OnInit } from '@angular/core';
import {CommonModule}  from "@angular/common";
import {QuizItemComponent} from "../quiz-item/quiz-item.component";
import { FormsModule } from '@angular/forms';
import {Quiz} from "../../../../models/quiz.model";
import {QuizService} from "src/services/quiz-list.service";
import { Router } from '@angular/router';

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

  constructor(private quizService: QuizService, private router:Router) {
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

}
