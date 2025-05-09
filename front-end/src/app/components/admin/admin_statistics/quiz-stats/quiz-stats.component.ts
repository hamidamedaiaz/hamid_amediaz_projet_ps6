import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Quiz } from 'src/models/quiz.model';
import {CurrentPageService} from "src/services/currentPage.service";

Chart.register(...registerables);

interface QuestionStat {
  text: string;
  options: string[];
  pctFirst: number[];
  pctSecond: number[];
  pctThird: number[];
  avgTime: number;
  hintsUsed: number;
}

@Component({
  selector: 'app-quiz-stats',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './quiz-stats.component.html',
  styleUrls: ['./quiz-stats.component.scss']
})
export class QuizStatsComponent implements OnInit, AfterViewInit {
  @Input() quiz!: Quiz;

  totalPlays      = Math.floor(Math.random() * 1000);
  averageTime     = Math.floor(Math.random() * 60) + 20;
  averageHints    = Math.floor(Math.random() * 4);
  averageAttempts = Math.floor(Math.random() * 3) + 1;

  questionsStats: QuestionStat[] = [];
  selectedIndex = 0;

  @ViewChild('groupChart') groupChartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  constructor(private pageService : CurrentPageService) {

  }

  goBack(){
    console.log("Test");
    this.pageService.adminNav("home")
  }

  ngOnInit(): void {
    this.questionsStats = this.quiz.questions.map(q => {
      // Construis la liste complète des réponses
      const opts = [
        ...q.answers.map(a => a.answerContent),
        q.correctAnswers[0].answerContent
      ];

      const randDist = (n: number) => {
        const arr = Array.from({ length: n }, () => Math.random());
        const sum = arr.reduce((s, v) => s + v, 0);
        return arr.map(v => Math.round((v / sum) * 100));
      };

      let first = randDist(opts.length);
      let second = randDist(opts.length);
      let third = randDist(opts.length);

      const fix = (arr: number[]) => {
        const diff = 100 - arr.reduce((s, v) => s + v, 0);
        arr[0] += diff;
        return arr;
      };
      first = fix(first);
      second = fix(second);
      third = fix(third);

      return {
        text: q.question,
        options: opts,
        pctFirst: first,
        pctSecond: second,
        pctThird: third,
        avgTime: Math.floor(Math.random() * 30) + 5,
        hintsUsed: Math.floor(Math.random() * 4)
      };

    });
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  selectQuestion(idx: number) {
    this.selectedIndex = idx;
    if (this.chart) {
      this.chart.data = this.getChartData(idx);
      this.chart.update();
    }
  }

  private renderChart() {
    const ctx = this.groupChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.getChartData(this.selectedIndex),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } },
          x: { ticks: { autoSkip: false, font: { size: 10 } } }
        },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  private getChartData(idx: number) {
    const stat = this.questionsStats[idx];
    return {
      labels: stat.options,
      datasets: [
        { label: '1er essai', data: stat.pctFirst,  backgroundColor: '#28a745' },
        { label: '2e essai', data: stat.pctSecond, backgroundColor: '#ffc107' },
        { label: '3e essai', data: stat.pctThird,  backgroundColor: '#dc3545' }
      ]
    };
  }
}
