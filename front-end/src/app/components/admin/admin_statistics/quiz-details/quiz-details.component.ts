import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { QuizResult } from 'src/models/quiz-result.model';
import { ComputeStatisticService } from 'src/services/computeStatistic.service';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss'
})

export class QuizDetailsComponent implements OnChanges {

  @Input() activeTab: 'answers' | 'players' = 'answers';
  @Output() tabChange = new EventEmitter<'answers' | 'players'>();

  ngOnChanges(changes: SimpleChanges) {
  }

  setActiveTab(tab: 'answers' | 'players') {
    this.tabChange.emit(tab);
  }
}

