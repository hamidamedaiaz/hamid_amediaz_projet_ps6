import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from 'src/models/answer.model';
import { CommonModule } from '@angular/common';
import { GamemodeService } from 'src/services/gamemode.service';
import { ProfileService } from 'src/services/profile.service';
import { Profile } from 'src/models/profile.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { GAMEMODE_UNDEFINED } from 'src/mocks/gamemode-list.mock';
import { Gamemode } from 'src/models/gamemode.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz-answer',
  standalone: true,
  imports: [QuizAnswerComponent, CommonModule],
  templateUrl: './quiz-answer.component.html',
  styleUrl: './quiz-answer.component.scss'
})
export class QuizAnswerComponent {
  
  @Input()
  answer:any;
  
  @Input()
  percent:any;

  @Output()
  answerSelected: EventEmitter<Answer> = new EventEmitter<Answer>();

  private profile:Profile | undefined;

  private gamemode:Gamemode = GAMEMODE_UNDEFINED;

  constructor(private gamemodeService:GamemodeService, private currentProfileService: CurrentProfileService){
    this.currentProfileService.current_profile$.subscribe((profile)=>{
      this.profile = profile;
    })

    
  }

  public getGamemode(){
    this.gamemode = this.gamemodeService.getCurrentGamemode();
    return this.gamemode.name;
  }
  
  public getRole(){
    return this.profile?.role;
  }

  selectedAnswer(){
    this.answerSelected.emit(this.answer);
  }

  getPercent(){
    return this.percent;
  }
}