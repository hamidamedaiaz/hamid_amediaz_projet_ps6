import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from 'src/services/quiz-list.service';
import { ProfileService } from 'src/services/profile.service';
import { QuizResultService } from 'src/services/quiz-result.service';
import { Quiz } from 'src/models/quiz.model';
import { Profile } from 'src/models/profile.model';
import { QuizResult, QuestionResult } from 'src/models/quiz-result.model';
import { QuizResultHeaderComponent } from 'src/app/components/admin/quiz-results/quiz-result-header/quiz-result-header.component';
import { QuizResultInfoComponent } from 'src/app/components/admin/quiz-results/quiz-result-info/quiz-result-info.component';
import { QuizResultQuestionsComponent } from 'src/app/components/admin/quiz-results/quiz-result-questions/quiz-result-questions.component';

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
export class QuizResultDetailsComponent implements OnInit {
  quizId: number = 0;
  profileId: number = 0;
  quiz: Quiz | null = null;
  profile: Profile | null = null;
  quizResult: QuizResult | null = null;
  
  quizDate: string = '';
  score: number = 0;
  totalQuestions: number = 0;
  percentage: number = 0;
  averageTimePerQuestion: number = 0;
  totalIndiceUsed: number = 0;
  
  questionResults: QuestionResult[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private profileService: ProfileService,
    private quizResultService: QuizResultService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileId = Number(params['profileId']);
      this.quizId = Number(params['quizId']);
      
      if (this.profileId && this.quizId) {
        this.chargementDesDonne();
      } else {
        this.router.navigate(['/admin']);
      }
    });
  }
  
  chargementDesDonne() {
    this.profileService.profiles$.subscribe(profiles => {
      this.profile = profiles.find(p => p.id === this.profileId) || null;
      if (!this.profile) {
        this.router.navigate(['/admin']);
        return;
      }
      
      this.quizService.quizzes$.subscribe(quizzes => {
        this.quiz = quizzes.find(q => q.id === this.quizId) || null;
        if (!this.quiz) {
          this.router.navigate(['/admin']);
          return;
        }
        
        this.quizResult = this.quizResultService.getResultByProfileAndQuiz(this.profileId, this.quizId);
        
        if (this.quizResult) {
          this.quizDate = this.formatDate(this.quizResult.date);
          this.score = this.quizResult.score;
          this.totalQuestions = this.quizResult.totalQuestions;
          this.percentage = this.quizResultService.calculatePercentage(this.score, this.totalQuestions);
          this.averageTimePerQuestion = this.quizResultService.calculateAverageTimePerQuestion(
            this.quizResult.timeSpent, 
            this.totalQuestions
          );
          this.totalIndiceUsed = this.quizResult.hintsUsed;
          this.questionResults = this.quizResult.questionResults;
        } else {
          this.creatNewResult();
        }
      });
    });
  }
  
  creatNewResult() {
    if (this.quiz) {
      this.quizDate = this.formatDate(new Date());
      this.score = Math.round(this.quiz.questions.length * 0.8); 
      this.totalQuestions = this.quiz.questions.length;
      this.percentage = 80;
      this.averageTimePerQuestion = 12.5;
      this.totalIndiceUsed = 3;
      
      this.questionResults = this.quiz.questions.map((question, index) => {
        const isCorrect = index < this.score; 
        return {
          questionId: question.questionId,
          question: question.question,
          correctAnswer: question.correctAnswer[0],
          userAnswer: isCorrect ? question.correctAnswer[0] : question.answers[0],
          isCorrect: isCorrect,
          timeSpent: Math.floor(Math.random() * 15) + 10, 
          hintsUsed: isCorrect ? 0 : 1 
        };
      });
    }
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  navigateBack() {
    this.router.navigate(['/player-stats', this.profileId]);
  }
}