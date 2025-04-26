import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-player-stats-therapy-metrics',
  standalone: true,

  imports: [CommonModule],
  
  templateUrl: './player-stats-therapy-metrics.component.html',
  styleUrls: ['./player-stats-therapy-metrics.component.scss']
})
export class PlayerStatsTherapyMetricsComponent {
  @Input() totalHintsUsed: number = 0;

  @Input() avgTimeBetweenAnswers: number = 0;
  @Input() correctAnswersPercent: number = 0;
  @Input() incorrectAnswersPercent: number = 0;
}