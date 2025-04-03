import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  ComprehensiveStats, 
  UserPerformance, 
  QuizPerformance, 
  CategoryDistribution,
  TimeSeriesDataPoint
} from './comprehensive-stats.model';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';

@Injectable({
  providedIn: 'root'
})
export class ComprehensiveStatsService {
  private statsSubject = new BehaviorSubject<ComprehensiveStats | null>(null);
  public stats$: Observable<ComprehensiveStats | null> = this.statsSubject.asObservable();

  constructor(
    private profileService: ProfileService,
    private quizService: QuizService
  ) {
    this.calculateComprehensiveStats();
  }

  calculateComprehensiveStats(): void {
    const mockStats: ComprehensiveStats = {
      totalUsers: 1245,
      totalQuizzes: 87,
      totalGamesPlayed: 15623,
      averageQuizScore: 68.5,

      userStats: {
        mostActiveUsers: this.generateMostActiveUsers(),
        newUsersThisMonth: 187,
        userGrowthRate: 12.4
      },

      quizStats: {
        mostPlayedQuizzes: this.generateMostPlayedQuizzes(),
        categoriesDistribution: this.generateCategoryDistribution(),
        averageQuizCompletion: 75.2
      },

      timeSeriesData: {
        dailyActiveUsers: this.generateTimeSeriesData(30),
        dailyQuizzesTaken: this.generateTimeSeriesData(30)
      }
    };

    this.statsSubject.next(mockStats);
  }

  private generateMostActiveUsers(): UserPerformance[] {
    return [
      {
        userId: 1,
        name: 'Jean',
        lastName: 'Dupont',
        totalQuizzesTaken: 124,
        averageScore: 85.6,
        lastActive: new Date()
      },
      {
        userId: 2,
        name: 'Marie',
        lastName: 'Dubois',
        totalQuizzesTaken: 98,
        averageScore: 79.3,
        lastActive: new Date()
      }
    ];
  }

  private generateMostPlayedQuizzes(): QuizPerformance[] {
    return [
      {
        quizId: 1,
        title: 'Quiz Années 60',
        totalPlays: 1245,
        averageScore: 72.5,
        difficulty: 'Medium'
      },
      {
        quizId: 2,
        title: 'Rock Classique',
        totalPlays: 987,
        averageScore: 68.3,
        difficulty: 'Hard'
      }
    ];
  }

  private generateCategoryDistribution(): CategoryDistribution[] {
    return [
      { category: 'Musique', percentage: 45, count: 39 },
      { category: 'Cinéma', percentage: 25, count: 22 },
      { category: 'Histoire', percentage: 15, count: 13 },
      { category: 'Sport', percentage: 10, count: 9 },
      { category: 'Science', percentage: 5, count: 4 }
    ];
  }

  private generateTimeSeriesData(days: number): TimeSeriesDataPoint[] {
    const data: TimeSeriesDataPoint[] = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      data.push({
        date,
        value: Math.floor(Math.random() * 200) + 50
      });
    }

    return data.reverse();
  }
}