import { Component } from '@angular/core';
import { MultiPlayerQuizService } from 'src/services/multiplayer-quiz.service';
import { ProfileItemComponent } from 'src/app/components/admin/profiles/profile-item/profile-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profile } from 'src/models/profile.model';

@Component({
  selector: 'app-multiplayer-profile-list',
  standalone: true,
  imports: [ProfileItemComponent,CommonModule, FormsModule],
  templateUrl: './multiplayer-profile-list.component.html',
  styleUrl: './multiplayer-profile-list.component.scss'
})
export class MultiplayerProfileListComponent {

  public searchQuery:string ='';

  private players:Profile[] = [];

  constructor(private multiplayerQuizService:MultiPlayerQuizService){
    this.multiplayerQuizService.players$.subscribe((players) => {
      this.players = players;
    })
    console.log(this.players);
  }

  public getPlayers(){
    return this.players;
  }

  public filteredPlayers() {
    return this.players.filter(profile => 
      profile.name.toLowerCase().concat(' ').concat(profile.lastName.toLowerCase()).includes(this.searchQuery.toLowerCase())
    );
  }
  
  public removePlayer(profile:Profile){
    this.multiplayerQuizService.removePlayer(profile);
  }
}
