import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentQuizService } from 'src/services/current-quiz.service';
import { CurrentPageService } from 'src/services/currentPage.service';
import { QuizService } from 'src/services/quiz-list.service';

@Component({
  selector: 'app-waiting-start-page',
  standalone: true,
  imports: [],
  templateUrl: './waiting-start-page.component.html',
  styleUrl: './waiting-start-page.component.scss'
})


export class WaitingStartPageComponent {

  constructor(private router:Router, private currentQuizService:CurrentQuizService, private quizService:QuizService, private currentPageService:CurrentPageService){
    this.currentPageService.setCurrentPage("waiting-start-page")

  }


  public redirectToOnlineGame(){
    //On set un quiz par defaut pour la demo
    this.currentQuizService.setCurrentQuiz(this.quizService.quizzes$.getValue()[0]);
    this.router.navigate(['/multiplayer-game']);
  }

  public leaveQueue(){
    this.router.navigate(['/multiplayer-game-login'])
  }
}
