import { Component, OnInit } from '@angular/core';
import { Gamemode } from 'src/models/gamemode.model';
import { GamemodeService } from 'src/services/gamemode.service';


@Component({
  selector: 'app-gamemode-list',
  templateUrl: './gamemode-list.component.html',
  styleUrl: './gamemode-list.component.scss'
})
export class GamemodeListComponent implements OnInit {

  public gamemodeList: Gamemode[] = [];

  constructor(public gamemodeService: GamemodeService){
    this.gamemodeService.gamemodes$.subscribe((gamemodes) => {
      this.gamemodeList = gamemodes;
    });
  }

  ngOnInit() {}

  gamemodeSelected(name: string) {
    if(name === 'Solo'){
      this.gamemodeService.playSolo();
    }
    else if(name === 'Multi'){
      this.gamemodeService.playMulti();
    }
  }

}
