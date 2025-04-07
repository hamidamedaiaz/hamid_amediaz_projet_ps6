import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';

interface GameHistory {
  quizId: number;
  quizTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentageCorrect: number;
  timeSpent: number;
  hintsUsed: number;
}

interface MonthProgress {
  month: string;
  score: number;
}

interface QuizCategoryData {
  category: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-player-stats-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './player-stats-details.component.html',
  styleUrl: './player-stats-details.component.scss'
})
export class PlayerStatsDetailsComponent implements OnInit {
  profile: Profile | null = null;
  profileId: number = 0;
  
  totalGames: number = 0;
  successRate: number = 0;
  averageResponseTime: number = 0;
  averageTimePerQuestion: number = 0;
  averageHintsUsed: number = 0;
  
  totalHintsUsed: number = 0;        
  avgTimeBetweenAnswers: number = 0; 
  totalCorrectAnswers: number = 0;    
  totalIncorrectAnswers: number = 0;  
  correctAnswersPercent: number = 0;  
  incorrectAnswersPercent: number = 0; 
  
  monthlyPerformance: MonthProgress[] = [];
  quizCategoryData: QuizCategoryData[] = [];
  quizResults: GameHistory[] = [];
  
  activeTab: 'score' | 'hints' | 'time' | 'accuracy' = 'score';
  
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileId = Number(params['id']);
      if (this.profileId) {
        this.loadProfileData();
        this.generateStatsData();
      } else {
        this.router.navigate(['/admin']);
      }
    });
  }

  loadProfileData() {
    this.profileService.profiles$.subscribe(profiles => {
      this.profile = profiles.find(p => p.id === this.profileId) || null;
      if (!this.profile) {
        this.router.navigate(['/admin']);
      }
    });
  }

  generateStatsData() {
    this.totalGames = Math.floor(Math.random() * 20) + 5;
    this.successRate = Math.floor(Math.random() * 40) + 40;
    this.averageResponseTime = Math.floor(Math.random() * 100) / 10 + 3;
    this.averageTimePerQuestion = Math.floor(Math.random() * 100) / 10 + 5;
    this.averageHintsUsed = Math.floor(Math.random() * 10) / 10 + 1;
    
    this.totalHintsUsed = Math.floor(this.averageHintsUsed * this.totalGames);
    this.avgTimeBetweenAnswers = this.averageTimePerQuestion + Math.random() * 2;
    this.totalCorrectAnswers = Math.floor(this.totalGames * 15 * this.successRate / 100);
    this.totalIncorrectAnswers = Math.floor(this.totalGames * 15) - this.totalCorrectAnswers;
    this.correctAnswersPercent = this.successRate;
    this.incorrectAnswersPercent = 100 - this.successRate;

    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
    this.monthlyPerformance = months.map(month => ({
      month,
      score: Math.floor(Math.random() * 30) + 50
    }));

    const categories = ['Années 80', 'Années 90', 'Rock', 'Pop', 'Jazz'];
    let totalCount = 0;
    
    this.quizCategoryData = categories.map(category => {
      const count = Math.floor(Math.random() * 5) + 1;
      totalCount += count;
      return { category, count, percentage: 0 };
    });
    
    this.quizCategoryData.forEach(category => {
      category.percentage = Math.round((category.count / totalCount) * 100);
    });

    this.quizService.quizzes$.subscribe(quizzes => {
      const sampleQuizzes = quizzes.slice(0, Math.min(5, quizzes.length));
      
      this.quizResults = Array.from({length: Math.min(8, this.totalGames)}, (_, i) => {
        const quizIndex = i % sampleQuizzes.length;
        const quiz = sampleQuizzes[quizIndex] || {
          id: i + 1,
          title: `Quiz Exemple ${i + 1}`,
          description: 'Quiz généré',
          questions: []
        };
        
        const totalQuestions = quiz.questions.length || 15;
        const correctQuestions = Math.floor(Math.random() * totalQuestions) + Math.floor(totalQuestions / 3);
        
        return {
          quizId: quiz.id,
          quizTitle: quiz.title,
          date: this.getRandomDate(),
          score: correctQuestions,
          totalQuestions: totalQuestions,
          percentageCorrect: Math.round((correctQuestions / totalQuestions) * 100),
          timeSpent: Math.floor(Math.random() * 20) + 5,
          hintsUsed: Math.floor(Math.random() * 3)
        };
      });
      
      this.quizResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  getRandomDate(): string {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - Math.floor(Math.random() * 60));
    return pastDate.toLocaleDateString();
  }

  getInitials(profile: Profile): string {
    if (!profile) return '';
    return (profile.name.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
  }

  getScoreColor(score: number): string {
    if (score >= 70) return 'correct';
    if (score >= 50) return 'warning';
    return 'incorrect';
  }

  setActiveTab(tab: 'score' | 'hints' | 'time' | 'accuracy') {
    this.activeTab = tab;
  }

  getHeightPercentage(value: number): number {
    switch (this.activeTab) {
      case 'score': 
      case 'accuracy': 
        return value; 
      case 'hints':
        return (value / 5) * 100; 
      case 'time':
        return (value / 15) * 100; 
      default:
        return value;
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