import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { CurrentPageService } from 'src/services/currentPage.service';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { QuizQuestionComponent } from 'src/app/components/quizzes/quiz-question/quiz-question.component';
import { QuizService } from 'src/services/quiz.service';


@Component({
  selector: 'app-singleplayer-page',
  standalone:true,
  imports: [QuizQuestionComponent],
  templateUrl: './singleplayer-game-page.component.html',
  styleUrl: './singleplayer-game-page.component.scss'
})

export class SingleplayerGamePageComponent {

  private currentProfile: Profile | undefined;

  constructor(private router: Router, private currentProfileService: CurrentProfileService, 
              private currentPageService: CurrentPageService,
              private quizService: QuizService){
    this.currentProfileService.current_profile$.subscribe((currentProfile) => {
      this.currentProfile = currentProfile;
    })
    this.currentPageService.setCurrentPage("singleplayer-game")
  }
  
  public leaveQuiz(){
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
