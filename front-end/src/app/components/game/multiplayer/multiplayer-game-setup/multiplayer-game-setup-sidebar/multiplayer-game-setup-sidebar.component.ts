import { Component, EventEmitter, Output } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QUESTION } from 'src/mocks/question.mock';
import { Router } from '@angular/router';
import { GamemodeService } from 'src/services/gamemode.service';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-multiplayer-game-setup-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './multiplayer-game-setup-sidebar.component.html',
  styleUrl: './multiplayer-game-setup-sidebar.component.scss'
})
export class MultiplayerGameSetupSidebarComponent {

  @Output()
  launch_game: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  public quiz: Quiz | null = null;

  //génère un code aléatoire en hexadecimal sur 5 caractères
  public gameCode: string = (Math.random() * 0x10000 | 0).toString(16).padStart(5, '0').toUpperCase();



  constructor(private router: Router, private quizService:QuizService) {
    this.quizService.quiz$.subscribe((quiz)=>{
      this.quiz=quiz;
    })
  }

  public launchGame() { this.launch_game.emit(true); }

  public leaveSetup() {
    console.log("Leaving Setup");
    this.quizService.resetCurrentQuiz();
    this.router.navigate(["/admin"])
  }
}
