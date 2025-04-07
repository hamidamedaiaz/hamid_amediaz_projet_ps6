import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QuizComponent } from 'src/app/components/quizzes/quiz/quiz.component';
import { Profile } from 'src/models/profile.model';
import { CurrentPageService } from 'src/services/currentPage.service';
import { CurrentProfileService } from 'src/services/currentProfile.service';


@Component({
  selector: 'app-singleplayer-page',
  standalone:true,
  imports: [QuizComponent],
  templateUrl: './singleplayer-game-page.component.html',
  styleUrl: './singleplayer-game-page.component.scss'
})

export class SingleplayerGamePageComponent {

  private currentProfile: Profile | undefined;

  constructor(private router: Router, private currentProfileService: CurrentProfileService, private currentPageService: CurrentPageService){
    this.currentProfileService.current_profile$.subscribe((currentProfile) => {
      this.currentProfile = currentProfile;
    })
    this.currentPageService.setCurrentPage("singleplayer-game")

  }
  
  public leaveQuiz(){
    this.currentProfileService.resetCurrentProfile();
    this.router.navigate(["/"]);
  }

  public accessToSettings(){
    if(this.currentProfile){
      console.log(this.currentProfile);
      this.router.navigate(["/settings"])
    }
  }


}
