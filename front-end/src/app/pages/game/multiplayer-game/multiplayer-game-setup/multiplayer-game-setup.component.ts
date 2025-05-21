import { ProfileListComponent } from 'src/app/components/admin/profiles/profile-list/profile-list.component';
import { MultiplayerGameSetupSidebarComponent } from 'src/app/components/game/multiplayer-game-setup/multiplayer-game-setup-sidebar/multiplayer-game-setup-sidebar.component';
import { CurrentPageService } from 'src/services/currentPage.service';
import { MultiplayerProfileListComponent } from 'src/app/components/game/multiplayer-game-setup/multiplayer-profile-list/multiplayer-profile-list.component';
import { MultiPlayerGameService } from 'src/services/multiplayer-game.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GamemodeService } from 'src/services/gamemode.service';
import { QuizService } from 'src/services/quiz.service';
import { WebSocketService } from 'src/services/websocket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-multiplayer-game-setup',
  standalone: true,
  imports: [
    ProfileListComponent,
    MultiplayerGameSetupSidebarComponent,
    MultiplayerProfileListComponent
  ],
  templateUrl: './multiplayer-game-setup.component.html',
  styleUrl: './multiplayer-game-setup.component.scss'
})

export class MultiplayerGameSetupComponent implements OnInit, OnDestroy  {
  private subscriptions: Subscription[] = [];
  public gameCode: string = '';
  public players: any[] = [];
  constructor(private gamemodeService:GamemodeService,
              private currentPageService:CurrentPageService, 
              private multiPlayerQuizService: MultiPlayerGameService, 
              private quizService:QuizService,
              private router: Router,
    private webSocketService: WebSocketService,
              ){
    this.currentPageService.setCurrentPage("multiplayer-setup");
  }

  public getNumberOfPlayer(){
    return this.multiPlayerQuizService.getNumberOfPlayers();
  }

  
  
  ngOnInit() {
    // Créer une nouvelle session de jeu
    const currentQuiz = this.quizService.quiz;
    this.webSocketService.createGame(currentQuiz);
    
    // S'abonner aux mises à jour
    this.subscriptions.push(
      this.webSocketService.gameCode$.subscribe(code => {
        this.gameCode = code;
      })
    );
    
    this.subscriptions.push(
      this.webSocketService.players$.subscribe(players => {
        this.players = players;
      })
    );
    
    this.subscriptions.push(
      this.webSocketService.error$.subscribe(error => {
        if (error) {
          console.error('Erreur WebSocket:', error);
          // Afficher l'erreur à l'utilisateur
        }
      })
    );
  }
  
  ngOnDestroy() {
    // Se désabonner pour éviter les fuites mémoire
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  launchGame() {
    this.webSocketService.startGame();
    this.router.navigate(['/multiplayer-game']);
  }
  
  getNumberOfPlayers() {
    return this.players.length;
  }
  
  leaveSetup() {
    this.webSocketService.leaveGame();
    this.router.navigate(['/admin']);
  }
}


