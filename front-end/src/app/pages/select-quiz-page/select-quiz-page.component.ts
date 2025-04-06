import { Component } from '@angular/core';
import { QuizAppComponent } from 'src/app/components/admin/quiz-app/quiz-app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-quiz-page',
  standalone: true,
  imports: [QuizAppComponent],
  templateUrl: './select-quiz-page.component.html',
  styleUrl: './select-quiz-page.component.scss'
})
export class SelectQuizPageComponent {

  constructor(private router:Router){}

  public leavePage(){
    this.router.navigate(["/gamemode-selection"])
  }
}
