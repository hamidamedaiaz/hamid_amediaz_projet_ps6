import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Quiz } from 'src/models/quiz.model';
import { CurrentPageService } from "src/services/currentPage.service";
import { EMPTY_QUIZ } from 'src/mocks/quiz.mock';
import { StatsService } from 'src/services/stats.service';
import { QuizListService } from 'src/services/quiz-list.service';
import { ComputeStatisticService } from 'src/services/computeStatistic.service';
import { QuizResultService } from 'src/services/quiz-result.service';
import { QuizResult } from 'src/models/quiz-result.model';

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
export class QuizStatsComponent {
  private quiz: Quiz = EMPTY_QUIZ;
  private quizId: number = this.quiz.id;

  totalPlays = 0 ;
  averageTime = 0 ; 
  averageHints = 0 ; 
  averageAttempts = 0 ;
  quizResults:QuizResult[] =  [];

  questionsStats: QuestionStat[] = [];
  selectedIndex: number = 0;

  @Output()
  go_back: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('groupChart') groupChartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  constructor(private pageService: CurrentPageService, 
              private statsService: StatsService, 
              private quizListService: QuizListService,
              private computeStatisticService: ComputeStatisticService,
              private quizResultService: QuizResultService) {
    this.statsService.quizId$.subscribe((quizId) => {
      this.quizId = quizId;
    });

    this.quiz = this.quizListService.getQuiz(this.quizId)
    this.quizResults = this.quizResultService.getQuizResultsByQuiz(this.quizId);

    this.totalPlays = this.computeStatisticService.getNumberOfPlays(this.quizResults);
    this.averageTime = this.computeStatisticService.getAverageTotalTimeSpent(this.quizResults);
    this.averageHints = this.computeStatisticService.getAverageTotalHintsUsed(this.quizResults);
    this.averageAttempts = this.computeStatisticService.getAllAverageAttempts(this.quizResults)

    this.selectedIndex = 0;
    this.loadQuestions();
    this.renderChart();
    setTimeout(() => {
      if (this.groupChartRef) {
        this.renderChart();
      }
    });


  }

  public getQuiz() { return this.quiz }

  goBack() {
    { this.pageService.adminNav('selection-stat-quiz') }
  }

  loadQuestions(): void {
    this.questionsStats = this.quiz.questions.map(q => {
      // Construis la liste complète des réponses
      const opts = [
        ...q.answers.map(a => a.answerContent)
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
        avgTime: 0 ,//this.computeStatisticService(),
        hintsUsed: 0 //this.computeStatisticService
      };

    });
  }


  selectQuestion(idx: number) {
    this.selectedIndex = idx;
    if (this.chart) {
      this.chart.data = this.getChartData(idx);
      this.chart.update();
    }
  }

  private renderChart() {
    const ctx = this.groupChartRef?.nativeElement?.getContext('2d');
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
        { label: '1er essai', data: stat.pctFirst, backgroundColor: '#28a745' },
        { label: '2e essai', data: stat.pctSecond, backgroundColor: '#ffc107' },
        { label: '3e essai', data: stat.pctThird, backgroundColor: '#dc3545' }
      ]
    };
  }
}
