import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiplayer-game-login-page',
  standalone: true,
  imports: [],
  templateUrl: './multiplayer-game-login-page.component.html',
  styleUrl: './multiplayer-game-login-page.component.scss'
})
export class MultiplayerGameLoginPageComponent {

  public code:string = "";

  constructor(private router:Router){  
  }

  public joinGame(code:String){
    console.log("Game joined with the code: ", code);
    this.router.navigate(["/multiplayer-game"]);
  }

  public leave(){
    this.router.navigate(["/"]);
  }

}
