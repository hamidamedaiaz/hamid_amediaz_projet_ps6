import { Component } from '@angular/core';
import {PlayerItemComponent} from "../../components/multiplayer-game-setup/player-item/player-item.component";

@Component({
  selector: 'app-multiplayer-game-setup',
  standalone: true,
  imports: [
    PlayerItemComponent
  ],
  templateUrl: './multiplayer-game-setup.component.html',
  styleUrl: './multiplayer-game-setup.component.scss'
})
export class MultiplayerGameSetupComponent {

}
