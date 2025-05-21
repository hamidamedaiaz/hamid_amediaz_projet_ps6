import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service'
import { CurrentPageService } from 'src/services/currentPage.service';
import { QuizListService } from 'src/services/quiz-list.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-waiting-start-page',
  standalone: true,
  imports: [],
  templateUrl: './waiting-start-page.component.html',
  styleUrl: './waiting-start-page.component.scss'
})


export class WaitingStartPageComponent implements OnInit, OnDestroy {
  public waiting_message: string = "En attente du début de la partie";
  private subscriptions: Subscription[] = [];
  private redirectionTimer:any = null;

  private gamefoundTimer:any = null;

  constructor(private router:Router, private quizService:QuizService, private quizListService:QuizListService, private currentPageService:CurrentPageService,    private webSocketService: WebSocketService
){
    this.currentPageService.setCurrentPage("waiting-start-page")
    this.redirectionTimer = setTimeout(() => {
      this.redirectToOnlineGame();
    }, 3000);
    this.gamefoundTimer = setTimeout(() => {
      this.waiting_message = "Partie trouvée !"
    }, 2000);
  }

  public redirectToOnlineGame(){
    //On set un quiz par defaut pour la demo
    this.quizService.setQuiz(this.quizListService.quizzes$.getValue()[0]);
    this.quizService.startQuiz();
    this.router.navigate(['/multiplayer-game']);
  }

  ngOnInit() {
    // S'abonner au statut de la partie
    this.subscriptions.push(
      this.webSocketService.gameStatus$.subscribe(status => {
        if (status === 'playing') {
          this.router.navigate(['/multiplayer-game']);
        }
      })
    );
    
    // S'abonner aux erreurs
    this.subscriptions.push(
      this.webSocketService.error$.subscribe(error => {
        if (error) {
          this.waiting_message = error;
        }
      })
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  public leaveQueue() {
    this.webSocketService.leaveGame();
    this.router.navigate(['/multiplayer-game-login']);
  }
}

