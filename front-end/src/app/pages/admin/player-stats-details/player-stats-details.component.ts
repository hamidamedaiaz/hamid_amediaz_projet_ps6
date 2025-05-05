import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import { QuizResultService } from 'src/services/quiz-result.service';
import { Profile } from 'src/models/profile.model';


import {PlayerStatsHeaderComponent} from 'src/app/components/admin/admin_statistics/player-stats/player-stats-header/player-stats-header.component';
import { PlayerStatsOverviewComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-overview/player-stats-overview.component';

import { PlayerStatsTherapyMetricsComponent} from 'src/app/components/admin/admin_statistics/player-stats/player-stats-therapy-metrics/player-stats-therapy-metrics.component';

import { PlayerStatsProgressionComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-progression/player-stats-progression.component';
import { PlayerStatsQuizHistoryComponent } from 'src/app/components/admin/admin_statistics/player-stats/player-stats-quiz-history/player-stats-quiz-history.component';


@Component({
  selector: 'app-player-stats-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    PlayerStatsHeaderComponent,
    PlayerStatsOverviewComponent ,
    PlayerStatsTherapyMetricsComponent,

    PlayerStatsProgressionComponent,

    PlayerStatsQuizHistoryComponent
  ],

  templateUrl: './player-stats-details.component.html',
  styleUrl: './player-stats-details.component.scss'
})

export class PlayerStatsDetailsComponent implements OnInit {
  profile: Profile | null = null;

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

  monthlyPerformance: any[] = [];
  quizResults: any[] = [];

  activeTab: 'score' | 'hints' | 'time' | 'accuracy' = 'score';

  Math = Math;

  @Input() profileId:number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private quizResultService: QuizResultService
  ) {}

  ngOnInit() {
      if (this.profileId) {
        this.loadProfileData();
        this.statistics();
      } else {
        this.router.navigate(['/admin']);
      }
  }

  loadProfileData() {
    this.profileService.profiles$.subscribe(profiles => {
      this.profile = profiles.find(p => p.id === this.profileId) || null;
      if (!this.profile) {
        this.router.navigate(['/admin']);
      }
    });
  }

  statistics() {
    const playerStats = this.quizResultService.getPlayerTotalStats(this.profileId);

    this.totalGames = playerStats.totalGames;
    this.bestScore = playerStats.bestScore;
    this.averageScore = playerStats.averageScore;
    this.averageTimePerQuestion = playerStats.averageTimePerQuestion;
    this.totalHintsUsed = playerStats.totalHintsUsed;
    this.avgTimeBetweenAnswers = playerStats.averageTimePerQuestion;
    this.correctAnswersPercent = playerStats.correctAnswersPercent;
    this.incorrectAnswersPercent = playerStats.incorrectAnswersPercent;

    this.chargementDesdoneeMonsuelle();

    this.quizResults = this.quizResultService.getQuizHistoryForPlayer(this.profileId);
  }


  chargementDesdoneeMonsuelle() {
    this.setActiveTab(this.activeTab);
  }

  getScoreColor(score: number): string {
    if (score >= 70) return 'correct';
    if (score >= 50) return 'warning';
    return 'incorrect';
  }

  setActiveTab(tab: 'score' | 'hints' | 'time' | 'accuracy') {
    this.activeTab = tab;

    const monthlyData = this.quizResultService.getPlayerMonthlyStats(this.profileId);

    switch(tab) {
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


  viewQuizDetails(quizId: number) {
    this.router.navigate(['/quiz-result', this.profileId, quizId]);
  }


  navigateBack() {
    this.router.navigate(['/admin'], {

      queryParams: { section: 'stats-accueilli' }
    });
  }
}
