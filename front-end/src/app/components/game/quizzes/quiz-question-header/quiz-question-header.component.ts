import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from 'src/services/quiz.service';
import { MultiPlayerGameService } from 'src/services/multiplayer-game.service';
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

  private areHintsActives:Boolean = false;

  private DISPLAY_HINTS:string = "Afficher les indices";

  private HIDE_HINTS:string = "Masquer les indices";

  public showHintButtonContent:string = this.DISPLAY_HINTS

  constructor(private multiplayerQuizService:MultiPlayerGameService, 
              private curretProfileService:CurrentProfileService,
              private gamemodeService:GamemodeService,
              private quizService:QuizService){}

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
    this.areHintsActives = !this.areHintsActives;
    if(this.areHintsActives) this.showHintButtonContent = this.HIDE_HINTS;
    else this.showHintButtonContent = this.DISPLAY_HINTS;
  }

  public getGamemode(){
    return this.gamemodeService.getCurrentGamemode().name;
  }

  public isQuizRunning(){
    return this.quizService.isQuizRunning;
  }

}
