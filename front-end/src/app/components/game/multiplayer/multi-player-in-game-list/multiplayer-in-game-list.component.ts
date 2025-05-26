import { Component } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Profile } from 'src/models/profile.model';
import { MultiPlayerQuizService } from 'src/services/multiplayer-quiz.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-multiplayer-in-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiplayer-in-game-list.component.html',
  styleUrl: './multiplayer-in-game-list.component.scss'
})
export class MultiPlayerInGameListComponent {

  private players: Player[] = [];

  private intervalId:any;

  constructor(private multiplayerQuizService: MultiPlayerQuizService) {
    this.multiplayerQuizService.players$.subscribe((players) => {
      this.setPlayers(players);
      this.startSelectingPlayers();
    })
  }

  private startSelectingPlayers() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.selectRandomPlayer();
    }, 3000);
  }

  private selectRandomPlayer() {
    const unAnsweredPlayers = this.players.filter(p => !p.hasAnswered);

    if (unAnsweredPlayers.length === 0) {
      clearInterval(this.intervalId);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unAnsweredPlayers.length);
    const selectedPlayer = unAnsweredPlayers[randomIndex];

    const index = this.players.findIndex(p => p.profile.id === selectedPlayer.profile.id);
    if (index !== -1) {
      this.players[index].hasAnswered = true;
    }
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  private setPlayers(profiles: Profile[]) {
    profiles.forEach((profile) => {
      if (profile.id !== -1) {
        const player: Player = {
          profile: profile,
          hasAnswered: false
        };
        this.players.push(player);
      }
    });
  }

  getInitials(profile: Profile): string {
    if (!profile) return '';

    const firstName = profile.name.charAt(0).toUpperCase();
    const lastName = profile.lastName.charAt(0).toUpperCase();

    return firstName + lastName;
  }


}
