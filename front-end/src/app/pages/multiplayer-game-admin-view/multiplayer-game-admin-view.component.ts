import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestionComponent } from 'src/app/components/games/quiz-question/quiz-question.component';

@Component({
  selector: 'app-multiplayer-game-admin-view',
  standalone: true,
  imports: [QuizQuestionComponent],
  templateUrl: './multiplayer-game-admin-view.component.html',
  styleUrl: './multiplayer-game-admin-view.component.scss'
})


export class MultiplayerGameAdminViewComponent {

  constructor(private router:Router){}

  leaveQuiz(){
    this.router.navigate(["/"])
  }

}
