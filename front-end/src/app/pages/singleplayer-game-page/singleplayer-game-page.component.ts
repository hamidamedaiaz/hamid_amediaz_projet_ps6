import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QuizQuestionComponent } from 'src/app/components/games/quiz-question/quiz-question.component';
import { Profile } from 'src/models/profile.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';


@Component({
  selector: 'app-singleplayer-page',
  standalone:true,
  imports: [QuizQuestionComponent],
  templateUrl: './singleplayer-game-page.component.html',
  styleUrl: './singleplayer-game-page.component.scss'
})

export class SingleplayerGamePageComponent {

  private currentProfile: Profile | undefined;

  constructor(private router: Router, private currentProfileService: CurrentProfileService){
    this.currentProfileService.current_profile$.subscribe((currentProfile) => {
      this.currentProfile = currentProfile;
    })
  }
  
  public leaveQuiz(){
    this.router.navigate(["/"]);
  }

  public accessToSettings(){
    if(this.currentProfile){
      console.log(this.currentProfile);
      this.router.navigate(["/settings"])
    }
  }
}
