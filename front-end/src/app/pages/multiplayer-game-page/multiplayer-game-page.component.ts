import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { QuizComponent } from 'src/app/components/quizzes/quiz/quiz.component';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-multiplayer-game-page',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './multiplayer-game-page.component.html',
  styleUrl: './multiplayer-game-page.component.scss'
})
export class MultiplayerGamePageComponent {

  private currentProfile: Profile | undefined;
  
    constructor(private router: Router, private currentProfileService: CurrentProfileService, private currentPageService:CurrentPageService){
      this.currentProfileService.current_profile$.subscribe((currentProfile) => {
        this.currentProfile = currentProfile;
      })
      this.currentPageService.setCurrentPage("multiplayer-game-page")
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
