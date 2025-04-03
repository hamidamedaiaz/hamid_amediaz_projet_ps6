import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprehensiveStatsService } from './comprehensive-stats.service';
import { ComprehensiveStats, TimeSeriesDataPoint } from './comprehensive-stats.model';

@Component({
  selector: 'app-comprehensive-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comprehensive-stats.component.html',
  styleUrl: './comprehensive-stats.component.scss'
})
export class ComprehensiveStatsComponent implements OnInit {
  stats: ComprehensiveStats | null = null;

  constructor(private statsService: ComprehensiveStatsService) {}

  ngOnInit() {
    this.statsService.stats$.subscribe(stats => {
      this.stats = stats;
    });
  }

  calculateChartHeight(data?: TimeSeriesDataPoint[]): number {
    if (!data || data.length === 0) return 0;
    
    const maxValue = Math.max(...data.map(point => point.value));
    const minValue = Math.min(...data.map(point => point.value));
    
    return ((data[data.length - 1].value - minValue) / (maxValue - minValue)) * 100;
  }
}