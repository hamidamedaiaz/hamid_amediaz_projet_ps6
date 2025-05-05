import { Component } from '@angular/core';
import { QuizAppComponent } from 'src/app/components/admin/admin_quizzes/quiz-app/quiz-app.component';
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';


@Component({
  selector: 'app-select-quiz-page',
  standalone: true,
  imports: [QuizAppComponent],
  templateUrl: './select-quiz-page.component.html',
  styleUrl: './select-quiz-page.component.scss'
})
export class SelectQuizPageComponent {

  constructor(private router:Router, private currentPageService:CurrentPageService){
    this.currentPageService.setCurrentPage("select-quiz-page");
  }

  public leavePage(){
    this.router.navigate(["/gamemode-selection"])
  }
}
