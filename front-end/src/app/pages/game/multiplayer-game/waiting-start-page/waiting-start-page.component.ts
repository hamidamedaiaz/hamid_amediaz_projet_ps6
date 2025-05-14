import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service'
import { CurrentPageService } from 'src/services/currentPage.service';
import { QuizListService } from 'src/services/quiz-list.service';

@Component({
  selector: 'app-waiting-start-page',
  standalone: true,
  imports: [],
  templateUrl: './waiting-start-page.component.html',
  styleUrl: './waiting-start-page.component.scss'
})


export class WaitingStartPageComponent {

  private redirectionTimer:any = null;

  private gamefoundTimer:any = null;

  public waiting_message:string = "En attente du début de la partie";

  constructor(private router:Router, private quizService:QuizService, private quizListService:QuizListService, private currentPageService:CurrentPageService){
    this.currentPageService.setCurrentPage("waiting-start-page")
    this.redirectionTimer = setTimeout(() => {
      this.redirectToOnlineGame();
    }, 3000);
    this.gamefoundTimer = setTimeout(() => {
      this.waiting_message = "Partie trouvée !"
      console.log("je suis la")
    }, 2000);
  }

  public redirectToOnlineGame(){
    //On set un quiz par defaut pour la demo
    this.quizService.setQuiz(this.quizListService.quizzes$.getValue()[0]);
    this.quizService.startQuiz();
    this.router.navigate(['/multiplayer-game']);
  }

  public leaveQueue(){
    if(this.redirectionTimer) clearTimeout(this.redirectionTimer)
    this.router.navigate(['/multiplayer-game-login'])
  }
}
