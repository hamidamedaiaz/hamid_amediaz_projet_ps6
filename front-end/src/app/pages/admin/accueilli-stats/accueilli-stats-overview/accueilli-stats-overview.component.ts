import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'src/models/profile.model';

@Component({
  selector: 'app-accueilli-stats-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueilli-stats-overview.component.html',
  styleUrls: ['./accueilli-stats-overview.component.scss']
})
export class AccueilliStatsOverviewComponent {
  @Input() profile: Profile | null = null;
  @Input() totalGames: number = 0;
  @Input() bestScore: number = 0;
  @Input() averageScore: number = 0;
  @Input() totalHintsUsed: number = 0;
  @Input() averageTimePerQuestion: number = 0;
  @Input() correctAnswersPercent: number = 0;
  @Input() incorrectAnswersPercent: number = 0;
}