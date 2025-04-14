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
  bestScore: number = 0;
  averageScore: number = 0;
  

  averageTimePerQuestion: number = 0;
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
  
  private readonly months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];

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
    this.bestScore = Math.floor(Math.random() * 20) + 75;
    this.averageScore = Math.floor(Math.random() * 30) + 60;
    


    this.averageTimePerQuestion = Math.floor(Math.random() * 100) / 10 + 5;
    this.avgTimeBetweenAnswers = this.averageTimePerQuestion + Math.random() * 2;
    this.totalHintsUsed = Math.floor(Math.random() * this.totalGames * 3);
    


    const totalQuestions = this.totalGames * 10; // Hypothèse: 10 questions par quiz
    this.totalCorrectAnswers = Math.floor(totalQuestions * this.averageScore / 100);
    this.totalIncorrectAnswers = totalQuestions - this.totalCorrectAnswers;
    this.correctAnswersPercent = Math.round((this.totalCorrectAnswers / totalQuestions) * 100);
    this.incorrectAnswersPercent = 100 - this.correctAnswersPercent;




    this.monthlyPerformance = this.months.map(month => ({
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
      this.quizResults = Array.from({length: Math.min(8, this.totalGames)}, (_, i) => {
        const quizIndex = i % Math.max(1, quizzes.length);
        const quiz = quizzes[quizIndex] || {
          id: i + 1,
          title: `Quiz Exemple ${i + 1}`,
          description: 'Quiz généré',
          questions: []
        };
        
        const totalQuestions = quiz.questions.length || 10;
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
    
    


    switch(tab) {
      case 'score':
        this.monthlyPerformance = this.months.map(month => ({
          month,
          score: Math.floor(Math.random() * 30) + 50
        }));
        break;
      case 'hints':
        this.monthlyPerformance = this.months.map(month => ({
          month,

          score: Math.floor(Math.random() * 60) + 20
        }));
        break;
      case 'time':
        this.monthlyPerformance = this.months.map(month => ({
          month,


          score: Math.floor(Math.random() * 40) + 40
        }));
        break;
      case 'accuracy':
        this.monthlyPerformance = this.months.map(month => ({
          month,
          score: Math.floor(Math.random() * 25) + 65
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