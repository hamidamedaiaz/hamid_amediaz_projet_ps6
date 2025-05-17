import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizResult } from 'src/models/quiz-result.model';
import { ComputeStatisticService } from 'src/services/computeStatistic.service';

@Component({
  selector: 'app-player-stats-quiz-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-stats-quiz-history.component.html',
  styleUrls: ['./player-stats-quiz-history.component.scss']
})

export class PlayerStatsQuizHistoryComponent {

  @Input() quizResults: QuizResult[] = [];
  
  @Output() viewDetailsEvent = new EventEmitter<number>();

  constructor(private computeStatisticsService:ComputeStatisticService){

  }

  viewQuizDetails(quizId: number) {
    this.viewDetailsEvent.emit(quizId);
  }
  
  getScoreColor(score: number): string {
    if (score >= 70) return 'correct';
    if (score >= 50) return 'warning';
    return 'incorrect';
  }

  getQuizId(quizResult: QuizResult):number{ return quizResult.quiz.id }

  getQuizTitle(quizResult: QuizResult):string{ return quizResult.quiz.title }

  getQuizDate(quizResult:QuizResult):number{ return quizResult.date }

  getQuizScore(quizResult:QuizResult):number{ 
    return this.computeStatisticsService.getScore(quizResult.quiz, quizResult.questionResults);
  }

  getQuizNbOfQuestions(quizResult:QuizResult):number{ return quizResult.quiz.questions.length }

  getPercent(quizResult:QuizResult):number{
    return this.computeStatisticsService.getPercentages(this.getQuizScore(quizResult), this.getQuizNbOfQuestions(quizResult))
  }

  getTimeSpent(quizResult:QuizResult):number{ return this.computeStatisticsService.getAverageTime(quizResult.questionResults) }

  getHintsUsed(quizResult:QuizResult):number{ return this.computeStatisticsService.getTotalHintUsed(quizResult.questionResults) }

  getQuizGamemodeName(quizResult:QuizResult):string{ return quizResult.gamemode.name }
}
