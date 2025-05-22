import { Component } from '@angular/core';
import { ProfileListComponent } from 'src/app/components/admin/profiles/profile-list/profile-list.component';
import { MultiplayerGameSetupSidebarComponent } from 'src/app/components/game/multiplayer-game-setup/multiplayer-game-setup-sidebar/multiplayer-game-setup-sidebar.component';
import { CurrentPageService } from 'src/services/currentPage.service';
import { MultiplayerProfileListComponent } from 'src/app/components/game/multiplayer-game-setup/multiplayer-profile-list/multiplayer-profile-list.component';
import { MultiPlayerGameService } from 'src/services/multiplayer-game.service';
import { Router } from '@angular/router';
import { GamemodeService } from 'src/services/gamemode.service';
import { QuizService } from 'src/services/quiz.service';

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

export class MultiplayerGameSetupComponent {
  constructor(private gamemodeService:GamemodeService,
              private currentPageService:CurrentPageService, 
              private multiPlayerQuizService: MultiPlayerGameService, 
              private quizService:QuizService,
              private router:Router){
    this.currentPageService.setCurrentPage("multiplayer-setup");
  }

  public getNumberOfPlayer(){
    return this.multiPlayerQuizService.getNumberOfPlayers();
  }

  public launchGame(){
    this.gamemodeService.setCurrentGamemode(1);
    this.quizService.startQuiz()
    this.router.navigate(["/multiplayer-game"])
  }
}
