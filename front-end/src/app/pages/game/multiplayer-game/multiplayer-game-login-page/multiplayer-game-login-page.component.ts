import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiplayer-game-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './multiplayer-game-login-page.component.html',
  styleUrl: './multiplayer-game-login-page.component.scss'
})
export class MultiplayerGameLoginPageComponent {

  public code:string = "";

  private JOIN_GAME_MESSAGE:string = "Rejoindre une partie"

  private NO_GAME_FOUND:string = "Partie terminée ou inexistante"

  private NOT_ABLE_TO_JOIN:string ="Impossible de rejoindre la partie"

  private INVALID_CODE:string="Code Invalide"

  public message:string="";

  constructor(private router:Router, private currentPageService:CurrentPageService){  
    this.currentPageService.setCurrentPage("multiplayer-game-login-page")
    this.message = this.JOIN_GAME_MESSAGE;
  }

  public joinGame(){
    if(this.code===""){
      this.message = this.INVALID_CODE;
    }
    else if(this.code === "0000"){
      console.log("code")
      this.message = this.NO_GAME_FOUND;
    } 
    else if (this.code === "1111"){
      this.message = this.NOT_ABLE_TO_JOIN
    } 
    else {
      console.log("Game joined with the code: ", this.code);
      this.router.navigate(["/waiting-start"]);
    }
  }

  public leave(){
    this.router.navigate(["/"]);
  }

}
