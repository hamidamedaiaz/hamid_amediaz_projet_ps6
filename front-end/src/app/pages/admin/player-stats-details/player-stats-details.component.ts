import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import { QuizResultService } from 'src/services/quiz-result.service';
import { Profile } from 'src/models/profile.model';
import { PlayerStatsHeaderComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-header/player-stats-header.component';
import { PlayerStatsOverviewComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-overview/player-stats-overview.component';
import { PlayerStatsTherapyMetricsComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-therapy-metrics/player-stats-therapy-metrics.component';
import { PlayerStatsProgressionComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-progression/player-stats-progression.component';
import { PlayerStatsQuizHistoryComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-quiz-history/player-stats-quiz-history.component';
import { QUIZ_RESULT_EMPTY } from 'src/mocks/quiz-results.mock';
import { QuizResultDetailsComponent } from '../quiz-result-details/quiz-result-details.component';
import { GUEST_PROFILE } from 'src/mocks/profile-list.mock';
import { StatsService } from 'src/services/stats.service';

@Component({
  selector: 'app-player-stats-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PlayerStatsHeaderComponent,
    PlayerStatsOverviewComponent,
    PlayerStatsTherapyMetricsComponent,
    QuizResultDetailsComponent,
    PlayerStatsProgressionComponent,
    PlayerStatsQuizHistoryComponent
  ],

  templateUrl: './player-stats-details.component.html',
  styleUrl: './player-stats-details.component.scss'
})

export class PlayerStatsDetailsComponent { //implements OnInit {
  profile: Profile = GUEST_PROFILE;

  totalGames: number = 0;
  bestScore: number = 0;
  averageScore: number = 0;
  averageTimePerQuestion: number = 0;
  totalHintsUsed: number = 0;
  avgTimeBetweenAnswers: number = 0;
  totalCorrectAnswers: number = 0;
  totalIncorrectAnswers: number = 0;
  correctAnswersPercent: number = 0;
  incorrectAnswersPercent: number = 0;

  isQuizSelected: boolean = false;

  monthlyPerformance: any[] = [];
  quizResults: any[] = [];

  activeTab: 'score' | 'hints' | 'time' | 'accuracy' = 'score';

  selectedQuizId: number = -1;


  private profileId: number = -1;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private quizResultService: QuizResultService,
    private statsService: StatsService
  ) {
    this.isQuizSelected = false;

    this.statsService.profileId$.subscribe((profileId) => {
      this.profileId = profileId
    })

    this.quizResultService.results$.subscribe(() => {
      this.quizResults = this.quizResultService.getQuizResultsByProfile(this.profileId);
    })

    this.profileService.getProfile(this.profileId).subscribe((profile) => this.profile = profile);
  }


  // ngOnInit() {
  //   if (this.profileId) {
  //     this.loadProfileData();
  //     this.statistics();
  //   } else {
  //     this.router.navigate(['/admin']);
  //   }
  // }

  // loadProfileData() {
  //   // this.profileService.profiles$.subscribe(profiles => {
  //   //   console.log("profileId; ",this.profileId)
  //   //   this.profile = profiles.find(p => p.id === this.profileId) || null;
  //   //   if (!this.profile) {
  //   //     this.router.navigate(['/admin']);
  //   //   }
  //   // });
  // }

  // statistics() {
  //   const playerStats = this.quizResultService.getPlayerTotalStats(this.profileId);
  //   this.totalGames = playerStats.totalGames;
  //   this.bestScore = playerStats.bestScore;
  //   this.averageScore = playerStats.averageScore;
  //   this.averageTimePerQuestion = playerStats.averageTimePerQuestion;
  //   this.totalHintsUsed = playerStats.totalHintsUsed;
  //   this.averageTimePerQuestion = playerStats.averageTimePerQuestion;
  //   this.correctAnswersPercent = playerStats.correctAnswersPercent;
  //   this.incorrectAnswersPercent = playerStats.incorrectAnswersPercent;
  //   this.loadMonthlyData();
  //   this.quizResults = [QUIZ_RESULT_EMPTY]//this.quizResultService.getQuizHistoryForPlayer(this.profileId);
  // }


  // loadMonthlyData() {
  //   this.setActiveTab(this.activeTab);
  // }

  getProfile() { return this.profile; }


  setActiveTab(tab: 'score' | 'hints' | 'time' | 'accuracy') {
    this.activeTab = tab;

    const monthlyData = this.quizResultService.getPlayerMonthlyStats(this.profileId);

    switch (tab) {
      case 'score':
        this.monthlyPerformance = monthlyData.map((data: any) => ({
          month: data.month,
          score: data.score
        }));
        break;
      case 'hints':
        this.monthlyPerformance = monthlyData.map((data: any) => ({
          month: data.month,
          score: data.hintUsage
        }));
        break;
      case 'time':
        this.monthlyPerformance = monthlyData.map((data: any) => ({
          month: data.month,
          score: data.responseTime
        }));
        break;
      case 'accuracy':
        this.monthlyPerformance = monthlyData.map((data: any) => ({
          month: data.month,
          score: data.accuracy
        }));
        break;
    }
  }


  viewQuizDetails(quizResultId: number) {
    this.isQuizSelected = true;
    this.selectedQuizId = quizResultId
    this.statsService.selectQuizResult(quizResultId);
  }

  hideResultDetails() { this.isQuizSelected = false }


  navigateBack() {
    this.isQuizSelected = false;
    this.selectedQuizId = -1
  }

  getScoreColor(score: number): string {
    if (score >= 70) return 'correct';
    if (score >= 50) return 'warning';
    return 'incorrect';
  }

  getQuizResults() { return this.quizResults; }
}
