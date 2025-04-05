import { Component } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QUESTION } from 'src/mocks/question.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiplayer-game-setup-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './multiplayer-game-setup-sidebar.component.html',
  styleUrl: './multiplayer-game-setup-sidebar.component.scss'
})
export class MultiplayerGameSetupSidebarComponent {


  public quiz:Quiz = { 
    id: 1, 
    title: "Quiz Années 60", 
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
    questions: [QUESTION] 
  }

  //génère un code aléatoire en hexadecimal sur 5 caractères
  public gameCode: string = (Math.random() * 0x10000 | 0).toString(16).padStart(5, '0').toUpperCase();


  constructor(private router:Router){

  }

  public launchGame(){
    console.log("Game Launched");
    this.router.navigate(["/multiplayer-game-admin-view"])
  }

  public leaveSetup(){
    console.log("Leaving Setup");
    this.router.navigate(["/admin"])
  }
}
