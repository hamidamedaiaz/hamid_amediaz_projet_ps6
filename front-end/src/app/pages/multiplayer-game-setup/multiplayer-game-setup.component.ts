import { Component } from '@angular/core';
import { ProfileListComponent } from 'src/app/components/profiles/profile-list/profile-list.component';
import { MultiplayerGameSetupSidebarComponent } from 'src/app/components/multiplayer-game-setup/multiplayer-game-setup-sidebar/multiplayer-game-setup-sidebar.component';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-multiplayer-game-setup',
  standalone: true,
  imports: [
    ProfileListComponent,
    MultiplayerGameSetupSidebarComponent
  ],
  templateUrl: './multiplayer-game-setup.component.html',
  styleUrl: './multiplayer-game-setup.component.scss'
})

export class MultiplayerGameSetupComponent {
  public nbPlayer:number = 5;

  constructor(private currentPageService:CurrentPageService){
    this.currentPageService.setCurrentPage("multiplayer-setup");
  }
}
