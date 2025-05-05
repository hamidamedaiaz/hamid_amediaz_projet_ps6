import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import Chart from 'chart.js/auto';

interface ProgressData {
  month: string;
  score: number;
}

@Component({
  selector: 'app-player-stats-progression',
  standalone: true,
  imports: [],
  templateUrl: './player-stats-progression.component.html',
  styleUrls: ['./player-stats-progression.component.scss']
})
export class PlayerStatsProgressionComponent implements AfterViewInit, OnChanges {

  @Input() monthlyPerformance: ProgressData[] = [];
  @Input() activeTab: 'score' | 'hints' | 'time' | 'accuracy' = 'score';
  @Output() tabChange = new EventEmitter<'score' | 'hints' | 'time' | 'accuracy'>();

  @ViewChild('progressChartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && (changes['monthlyPerformance'] || changes['activeTab'])) {
      this.updateChart();
    }
  }

  setActiveTab(tab: 'score' | 'hints' | 'time' | 'accuracy') {
    this.tabChange.emit(tab);
  }

  getTabLabel(tab: string): string {
    switch (tab) {
      case 'score': return 'Score global';
      case 'hints': return 'Utilisation des indices';
      case 'time': return 'Temps de réponse';
      case 'accuracy': return 'Précision';
      default: return '';
    }
  }

  initChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: this.getChartData(),
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: this.getYAxisLabel()
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: context => this.formatTooltipValue(context.parsed.y)
            }
          }
        }
      }
    });

  }

  getYAxisLabel(): string {
    switch (this.activeTab) {
      case 'time': return 'Temps (s)';
      case 'score':
      case 'accuracy':
      case 'hints':
      default: return '%';
    }
  }

  formatTooltipValue(value: number): string {
    switch (this.activeTab) {
      case 'time':
        return `${value.toFixed(1)} s`;
      default:
        return `${value}%`;
    }
  }


  updateChart() {
    const data = this.getChartData();
    this.chart.data = data;

    (this.chart.options!.scales!['y'] as any).title.text = this.getYAxisLabel();
    this.chart.options!.plugins!.tooltip!.callbacks = {
      label: context => this.formatTooltipValue(context.parsed.y)
    };

    this.chart.update();
  }


  getChartData() {
    return {
      labels: this.monthlyPerformance.map(m => m.month),
      datasets: [
        {
          label: this.getTabLabel(this.activeTab),
          data: this.monthlyPerformance.map(m => m.score),
          backgroundColor: '#1e88e5'
        }
      ]
    };
  }
}
