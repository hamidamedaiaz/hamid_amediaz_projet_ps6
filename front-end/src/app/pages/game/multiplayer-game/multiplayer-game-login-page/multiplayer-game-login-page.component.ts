import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/services/websocket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-multiplayer-game-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './multiplayer-game-login-page.component.html',
  styleUrl: './multiplayer-game-login-page.component.scss'
})
export class MultiplayerGameLoginPageComponent implements OnInit, OnDestroy {
  public code: string = "";
  public message: string = "Rejoindre une partie";
  private subscriptions: Subscription[] = [];

  private JOIN_GAME_MESSAGE:string = "Rejoindre une partie"

  private NO_GAME_FOUND:string = "Partie terminée ou inexistante"

  private NOT_ABLE_TO_JOIN:string ="Impossible de rejoindre la partie"

  private INVALID_CODE:string="Code Invalide"


  constructor(private router:Router, private currentPageService:CurrentPageService,    private webSocketService: WebSocketService,
){  
    this.currentPageService.setCurrentPage("multiplayer-game-login-page")
    this.message = this.JOIN_GAME_MESSAGE;
  }

 
  ngOnInit() {
    // S'abonner aux erreurs WebSocket
    this.subscriptions.push(
      this.webSocketService.error$.subscribe(error => {
        if (error) {
          this.message = error;
        }
      })
    );
    
    // S'abonner au statut de la partie
    this.subscriptions.push(
      this.webSocketService.gameStatus$.subscribe(status => {
        if (status === 'playing') {
          this.router.navigate(['/multiplayer-game']);
        } else if (status === 'waiting') {
          this.router.navigate(['/waiting-start']);
        }
      })
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  public joinGame() {
    if (this.code === "") {
      this.message = "Code Invalide";
      return;
    }
    
    // Tentative de rejoindre la partie
    this.webSocketService.joinGame(this.code);
  }
  
  public leave() {
    this.router.navigate(["/"]);
  }
}

