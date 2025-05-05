import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { CurrentPageService } from 'src/services/currentPage.service';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { QuizQuestionComponent } from 'src/app/components/game/quizzes/quiz-question/quiz-question.component';
import { QuizService } from 'src/services/quiz.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-singleplayer-page',
  standalone:true,
  imports: [QuizQuestionComponent, CommonModule],
  templateUrl: './singleplayer-game-page.component.html',
  styleUrl: './singleplayer-game-page.component.scss'
})

export class SingleplayerGamePageComponent {

  private currentProfile: Profile | undefined;

  public fontSize:string= '';

  constructor(private router: Router, private currentProfileService: CurrentProfileService, 
              private currentPageService: CurrentPageService,
              private quizService: QuizService){
    this.currentProfileService.current_profile$.subscribe((currentProfile) => {
      this.currentProfile = currentProfile;
      this.fontSize = this.currentProfile.FONT_SIZE.value
    })
    this.currentPageService.setCurrentPage("singleplayer-game")
  }

  
  public leaveQuiz(){
    this.quizService.resetCurrentQuiz();
    this.router.navigate(["/"]);
  }

}
