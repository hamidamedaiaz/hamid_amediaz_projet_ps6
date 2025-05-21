import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';
import { WebSocketService } from './websocket.service';
import { CurrentProfileService } from './currentProfile.service';

@Injectable({
  providedIn: 'root'
})
export class MultiPlayerGameService {
  private players: Profile[] = [];
  public players$: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  private quiz: Quiz | null = null;
  
  constructor(
    private webSocketService: WebSocketService,
    private currentProfileService: CurrentProfileService
  ) {
    // S'abonner aux mises à jour des joueurs du WebSocketService
    this.webSocketService.players$.subscribe(players => {
      this.players = players;
      this.players$.next(players);
    });
  }
  
  public getNumberOfGivenAnswers(): number {
    return this.webSocketService.answerCount$.getValue();
  }
  
  public joinGame(profile: Profile) {
    const gameCode = this.webSocketService.getGameCode();
    this.webSocketService.joinGame(gameCode);
  }
  
  public getNumberOfPlayers(): number {
    return this.players.length;
  }
  
  public getPlayers(): Profile[] {
    return this.players;
  }
  
  public removePlayer(player: Profile) {
    // Avec WebSocket, le joueur est retiré côté serveur
    // Le serveur envoie ensuite la liste mise à jour des joueurs
    this.webSocketService.leaveGame();
  }
  
  public startQuiz() {
    if (this.quiz) {
      this.webSocketService.startGame();
    }
  }
  
  public selectQuiz(quiz: Quiz) {
    this.quiz = quiz;
  }
}
