import { Component } from '@angular/core';
import { Gamemode } from 'src/models/gamemode.model';
import { GamemodeService } from 'src/services/gamemode.service';
import { LocalStorageService } from 'src/services/localstorage.service';


@Component({
  selector: 'app-gamemode-list',
  templateUrl: './gamemode-list.component.html',
  styleUrl: './gamemode-list.component.scss'
})
export class GamemodeListComponent {

  public gamemodeList: Gamemode[] = [];

  constructor(public gamemodeService: GamemodeService){
    this.gamemodeService.gamemodes$.subscribe((gamemodes) => {
      this.gamemodeList = gamemodes;
    });
  }

  gamemodeSelected(name: string) {
    if(name === 'Solo'){
      this.gamemodeService.playSolo();
    }
    else if(name === 'Multi'){
      this.gamemodeService.playMulti();
    }
  }

}
