import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizListService } from 'src/services/quiz-list.service';
import { ProfileService } from 'src/services/profile.service';
import { QuizResultService } from 'src/services/quiz-result.service';
import { Quiz } from 'src/models/quiz.model';
import { Profile } from 'src/models/profile.model';
import { QuizResult } from 'src/models/quiz-result.model';
import { QuestionResult } from 'src/models/question-result.model';
import { QuizResultHeaderComponent } from 'src/app/components/admin/admin_statistics/quiz-results/quiz-result-header/quiz-result-header.component';
import { QuizResultInfoComponent } from 'src/app/components/admin/admin_statistics/quiz-results/quiz-result-info/quiz-result-info.component';
import { QuizResultQuestionsComponent } from 'src/app/components/admin/admin_statistics/quiz-results/quiz-result-questions/quiz-result-questions.component';
import { ComputeStatisticService } from 'src/services/computeStatistic.service';
import { StatsService } from 'src/services/stats.service';
import { QUIZ_RESULT_EMPTY } from 'src/mocks/quiz-results.mock';

@Component({
  selector: 'app-quiz-result-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    QuizResultHeaderComponent,
    QuizResultInfoComponent,
    QuizResultQuestionsComponent
  ],
  templateUrl: './quiz-result-details.component.html',
  styleUrl: './quiz-result-details.component.scss'
})
export class QuizResultDetailsComponent {

  private profileId: number = -1;
  private profile!: Profile;
  private quizResult: QuizResult | null = null;
  private quizSessionId:number = -1;
  private quizId:number = -1;
  private quiz!:Quiz;

  constructor(
    private router:Router,
    private statsService:StatsService,
    private quizResultService:QuizResultService,
    private profileService:ProfileService
  ){
    //RETRIEVE USER ID AND QUIZ ID
    this.statsService.quizSessionId$.subscribe((quizSessionId) => this.quizSessionId = quizSessionId); //quizSessionId
    this.statsService.profileId$.subscribe((profileId) => this.profileId = profileId);

    //SAVE THEIRS INFORMATIONS
    this.quizResult = QUIZ_RESULT_EMPTY // this.quizResultService.getQuizResultById(this.quizSessionId);
    this.profile = this.profileService.getProfile(this.profileId);
    this.quiz = this.quizResult!.quiz;

  }

  getProfile(){ return this.profile }

  getQuiz(){ return this.quiz }

  getQuestionResults(){ return this.quizResult!.questionResults }

  getDate(){ return this.quizResult!.date }

  navigateBack() { this.router.navigate(['/player-stats', this.profileId]); }

}