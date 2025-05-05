import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz } from 'src/models/quiz.model';
import { Profile } from 'src/models/profile.model';

@Component({
  selector: 'app-quiz-result-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-result-info.component.html',
  styleUrls: ['./quiz-result-info.component.scss']
})
export class QuizResultInfoComponent {
  @Input() quiz: Quiz| null= null;
  @Input() profile: Profile | null = null;
  @Input() quizDate: string = '';
  @Input() score: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() percentage: number = 0;
  @Input() averageTimePerQuestion: number = 0;
  @Input() totalindIceUsed: number = 0;
  

  getScoreClass(): string {

    if (this.percentage >= 70) return 'grande-score';

    if (this.percentage >= 50) return 'moyenne-score';
    
    return 'petite-score';
  }
}