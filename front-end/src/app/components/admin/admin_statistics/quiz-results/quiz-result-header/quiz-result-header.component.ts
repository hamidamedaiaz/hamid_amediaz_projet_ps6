import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from 'src/services/stats.service';



@Component({

  selector: 'app-quiz-result-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-result-header.component.html',
  styleUrls: ['./quiz-result-header.component.scss']

})
export class QuizResultHeaderComponent {
  title: string = 'Résultat du Quiz';
  @Output() goBack = new EventEmitter();

  constructor(private statsService:StatsService){}
  
  goback(): void {
    this.goBack.emit()
  }

  deleteQuizResult() {
    this.goback();
    this.statsService.deleteQuizResult();
  }
}