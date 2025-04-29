import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { GamemodeService } from 'src/services/gamemode.service';

@Component({
  selector: 'app-music-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-control.component.html',
  styleUrl: './music-control.component.scss'
})
export class MusicControlComponent {
  @Input()
  volume!:number

  @Input()
  audio_path!:string

  @Output()
  restart_music: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  decrease_volume: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  increase_volume: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private gamemodeService:GamemodeService, private currentProfileService:CurrentProfileService){}


  public restartMusic() {
    console.log("restarting the music...");
  }

  public setVolume(new_volume: number) {
    this.volume = new_volume;
  }

  public getVolume() {
    return this.volume;
  }

  public increaseVolume() {
    if (this.volume < 100) {
      this.volume += 10;
      console.log("increasing the volume");
    }
  }

  public decreaseVolume() {
    if (this.volume > 0) {
      this.volume -= 10;
      console.log("decreasing the volume");
    }
  }

  public getGamemode(){
    return this.gamemodeService.getCurrentGamemode().name;
  }

  public getRole(){
    return this.currentProfileService.getCurrentProfile().role;
  }
}
