import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting-start-page',
  standalone: true,
  imports: [],
  templateUrl: './waiting-start-page.component.html',
  styleUrl: './waiting-start-page.component.scss'
})


export class WaitingStartPageComponent {

  constructor(private router:Router){}


  public redirectToOnlineGame(){
    this.router.navigate(['/multiplayer-game']);
  }

  public leaveQueue(){
    this.router.navigate(['/multiplayer-game-login'])
  }
}
