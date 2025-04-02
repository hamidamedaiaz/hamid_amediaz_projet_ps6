import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Gamemode } from "../models/gamemode.model";
import { GAMEMODE_LIST } from "../mocks/gamemode-list.mock";
import { CurrentProfileService } from "./currentProfile.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class GamemodeService {

    private gamemodes: Gamemode[] = GAMEMODE_LIST;

    public gamemodes$: BehaviorSubject<Gamemode[]> = new BehaviorSubject<Gamemode[]>(this.gamemodes);

    constructor(private currentProfileService: CurrentProfileService, private router: Router) {}
    
    playSolo(){
      console.log(this.currentProfileService.getCurrentProfile(), " is playing singleplayer");
      this.router.navigate(['/singleplayer-game']);
    }

    playMulti(){
      console.log(this.currentProfileService.getCurrentProfile(), " is playing multiplayer");
      this.router.navigate(['/multiplayer-game-login']);
    }
}