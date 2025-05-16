import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { QuizItemComponent } from "../quiz-item/quiz-item.component";
import { FormsModule } from '@angular/forms';
import { Quiz } from "src/models/quiz.model";
import { QuizListService } from "src/services/quiz-list.service";
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';
import { QuizService } from 'src/services/quiz.service';

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
export class QuizAppComponent {
  searchQuery: string = '';
  quizzes: Quiz[] = [];
  currentPage = this.currentPageService.getCurrentPage();

  @Input()
  context: String | undefined;

  public showDeleteConfirm: Boolean = false;

  public quizToDelete: Quiz | undefined;

  constructor(private quizListService: QuizListService, private quizService: QuizService, private router: Router, private currentPageService: CurrentPageService) {
    this.quizListService.quizzes$.subscribe((quizzes: Quiz[]) => {
      console.log("Nouveaux quizzes reçus :", quizzes);
      this.quizzes = quizzes;
    });
  }


  filteredQuizzes() {
    return this.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  launchMultiGame(quiz: Quiz) {
    console.log("Launching this quiz in multiplayer mode ", quiz);
    this.quizService.setQuiz(quiz);
    this.router.navigate(['/multiplayer-game-setup'])
  }

  launchSoloGame(quiz: Quiz) {
    console.log("Launching this quiz in singleplayer mode ", quiz);
    this.quizService.setQuiz(quiz);
    this.quizService.startQuiz();
    this.router.navigate(["/singleplayer-game"])
  }

  createQuiz() {
    this.quizListService.createQuiz();
  }

  deleteQuiz(quiz: Quiz) {
    this.showDeleteConfirm = true;
    this.quizToDelete = quiz;
    console.log("detected")
  }

  confirmDelete() {
    if (this.quizToDelete) {
      this.quizListService.deleteQuiz(this.quizToDelete.id);
      this.showDeleteConfirm = false;
    } else this.cancelDelete();
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    console.log("Suppresson canceled");
  }


  requestEditQuiz() {
  }

}
