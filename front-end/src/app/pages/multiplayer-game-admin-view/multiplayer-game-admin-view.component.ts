import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizComponent } from 'src/app/components/quizzes/quiz/quiz.component';
import { CurrentPageService } from 'src/services/currentPage.service';


@Component({
  selector: 'app-multiplayer-game-admin-view',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './multiplayer-game-admin-view.component.html',
  styleUrl: './multiplayer-game-admin-view.component.scss'
})


export class MultiplayerGameAdminViewComponent {

  constructor(private router:Router, private currentPageService:CurrentPageService){
    this.currentPageService.setCurrentPage("singleplayer-game")
  }

  leaveQuiz(){
    this.router.navigate(["/"])
  }

}
