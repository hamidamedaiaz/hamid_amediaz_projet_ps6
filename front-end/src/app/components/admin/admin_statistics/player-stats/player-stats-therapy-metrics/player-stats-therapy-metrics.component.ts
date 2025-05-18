import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputeStatisticService } from 'src/services/computeStatistic.service';
import { QuizResult } from 'src/models/quiz-result.model';

@Component({

  selector: 'app-player-stats-therapy-metrics',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './player-stats-therapy-metrics.component.html',
  styleUrls: ['./player-stats-therapy-metrics.component.scss']
})
export class PlayerStatsTherapyMetricsComponent implements OnInit {
  private totalHintsUsed: number = 0;
  private averageTimeSpent: number = 0;
  private correctAnswersPercent: number = 0;
  private incorrectAnswersPercent: number = 0;

  @Input()
  quizResults!: QuizResult[]

  constructor(private computeStatisticService: ComputeStatisticService) { }

  ngOnInit() {
    this.totalHintsUsed = this.computeStatisticService.getAverageTotalHintsUsed(this.quizResults)
    this.averageTimeSpent = this.computeStatisticService.getAverageTotalTimeSpent(this.quizResults)
    this.correctAnswersPercent = this.computeStatisticService.getPercentageOfCorrectAnswer(this.quizResults);
    this.incorrectAnswersPercent = this.computeStatisticService.getPercentageOfIncorrectAnswer(this.quizResults);

  }

  public getTotalHints() { return this.totalHintsUsed }
  public getAverageTimeSpent() { return this.averageTimeSpent }
  public getCorrectAnswerPercent() { return this.correctAnswersPercent }
  public getIncorrectAnswerPercent() { return this.incorrectAnswersPercent }

}