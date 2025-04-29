import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from 'src/services/quiz.service';
import { MultiPlayerQuizService } from 'src/services/multi-player-quiz.service';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { GamemodeService } from 'src/services/gamemode.service';

@Component({
  selector: 'app-quiz-question-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-question-header.component.html',
  styleUrl: './quiz-question-header.component.scss'
})

export class QuizQuestionHeaderComponent {

  @Input()
  title!:string;

  @Output()
  show_hints: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private multiplayerQuizService:MultiPlayerQuizService, 
              private curretProfileService:CurrentProfileService,
              private gamemodeService:GamemodeService){}

  getRole():string{
    return this.curretProfileService.getCurrentProfile().role;
  }

  getNumberOfGivenAnswer():number{
    return this.multiplayerQuizService.getNumberOfGivenAnswers();
  }

  getNumberOfPlayers():number{
    return this.multiplayerQuizService.getNumberOfPlayers();
  }

  showHints():void{
    this.show_hints.emit(true);
  }

  public getGamemode(){
    return this.gamemodeService.getCurrentGamemode().name;
  }

}
