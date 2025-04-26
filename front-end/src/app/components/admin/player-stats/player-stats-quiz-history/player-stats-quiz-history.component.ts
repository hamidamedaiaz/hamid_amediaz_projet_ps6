import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizHistoryItem {
  quizId: number;
  quizTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentageCorrect: number;
  timeSpent: number;
  hintsUsed: number;
}

@Component({
  selector: 'app-player-stats-quiz-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-stats-quiz-history.component.html',
  styleUrls: ['./player-stats-quiz-history.component.scss']
})

export class PlayerStatsQuizHistoryComponent {

  @Input() quizResults: QuizHistoryItem[] = [];
  
  @Output() viewDetailsEvent = new EventEmitter<number>();

  
  viewQuizDetails(quizId: number) {
    this.viewDetailsEvent.emit(quizId);
  }
  
  getScoreColor(score: number): string {
    if (score >= 70) return 'correct';
    if (score >= 50) return 'warning';
    return 'incorrect';
  }
}
