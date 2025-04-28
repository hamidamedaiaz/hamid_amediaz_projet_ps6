import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Gamemode } from "../models/gamemode.model";
import { GAMEMODE_LIST, GAMEMODE_UNDEFINED } from "../mocks/gamemode-list.mock";
import { CurrentProfileService } from "./currentProfile.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})

export class GamemodeService {

    private gamemodes: Gamemode[] = GAMEMODE_LIST;

    public gamemodes$: BehaviorSubject<Gamemode[]> = new BehaviorSubject<Gamemode[]>(this.gamemodes);

    private current_gamemode: Gamemode = GAMEMODE_UNDEFINED;

    constructor(private currentProfileService: CurrentProfileService, private localStorageService: LocalStorageService, private router: Router) {
      this.loadFromStorage();
    }
    
    private loadFromStorage(): void {
      const savedGamemode = this.localStorageService.getItem('Gamemode');
      
      if (savedGamemode) {
        this.current_gamemode = savedGamemode;
      }
    }

    playSolo(){
      console.log(this.currentProfileService.getCurrentProfile(), " is playing singleplayer");
      this.setCurrentGamemode("Solo")
      this.router.navigate(['/select-quiz']);
    }

    playMulti(){
      console.log(this.currentProfileService.getCurrentProfile(), " is playing multiplayer");
      this.setCurrentGamemode("Multi")
      this.router.navigate(['/multiplayer-game-login']);
    }

    public getCurrentGamemode(){
      return this.current_gamemode;
    }

    public setCurrentGamemode(gamemode_name: string): void {
      const foundGamemode = this.gamemodes.find(gamemode => gamemode.name === gamemode_name);
    
      if (foundGamemode) {
        this.current_gamemode = foundGamemode;
        console.log("Gamemode Select: ", foundGamemode.name)
        this.localStorageService.storeItem("Gamemode",JSON.stringify(foundGamemode))
      } else {
        this.current_gamemode = GAMEMODE_UNDEFINED;
        console.log("No gamemode found with name: ", gamemode_name);
        this.localStorageService.storeItem("Gamemode",JSON.stringify(GAMEMODE_UNDEFINED))
      }
      
    }
}