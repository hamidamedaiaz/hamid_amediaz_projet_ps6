import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-multiplayer-game-login-page',
  standalone: true,
  imports: [],
  templateUrl: './multiplayer-game-login-page.component.html',
  styleUrl: './multiplayer-game-login-page.component.scss'
})
export class MultiplayerGameLoginPageComponent {

  public code:string = "";

  constructor(private router:Router, private currentPageService:CurrentPageService){  
    this.currentPageService.setCurrentPage("multiplayer-game-login-page")
  }

  public joinGame(code:String){
    console.log("Game joined with the code: ", code);
    this.router.navigate(["/waiting-start"]);
  }

  public leave(){
    this.router.navigate(["/"]);
  }

}
