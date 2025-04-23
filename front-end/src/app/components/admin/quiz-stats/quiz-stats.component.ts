import { Component, Input } from '@angular/core';
import { Quiz } from "../../../../models/quiz.model";

@Component({
  selector: 'app-quiz-stats',
  standalone: true,
  templateUrl: './quiz-stats.component.html',
  styleUrls: ['./quiz-stats.component.scss']
})
export class QuizStatsComponent {
  @Input() quiz!: Quiz;

  getQuestionCount(): number {
    return this.quiz.questions.length;
  }

  getTimesPlayed(): number {
    return Math.floor(Math.random() * 100);
  }

  getAverageScore(): number {
    return Math.floor(Math.random() * 100);
  }

  getLastPlayedDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return date.toLocaleDateString();
  }
}
