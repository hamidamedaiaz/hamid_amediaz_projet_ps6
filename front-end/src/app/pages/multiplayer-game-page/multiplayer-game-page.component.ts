import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { CurrentPageService } from 'src/services/currentPage.service';
import { QuizQuestionComponent } from 'src/app/components/quizzes/quiz-question/quiz-question.component';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-multiplayer-game-page',
  standalone: true,
  imports: [QuizQuestionComponent],
  templateUrl: './multiplayer-game-page.component.html',
  styleUrl: './multiplayer-game-page.component.scss'
})
export class MultiplayerGamePageComponent {

  private currentProfile: Profile | undefined;
  
    constructor(private router: Router, 
                private currentProfileService: CurrentProfileService, 
                private currentPageService:CurrentPageService,
                private quizService: QuizService){
      this.currentProfileService.current_profile$.subscribe((currentProfile) => {
        this.currentProfile = currentProfile;
      })
      this.currentPageService.setCurrentPage("multiplayer-game-page")
    }

  public leaveQuiz(){
    this.currentProfileService.resetCurrentProfile();
    this.quizService.resetCurrentQuiz();
    this.router.navigate(["/"]);
  }

  public accessToSettings(){
    if(this.currentProfile){
      console.log(this.currentProfile);
      this.router.navigate(["/settings"])
    }
  }
}
