import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-quiz-item',
  standalone: true,
  imports: [],
  templateUrl: './quiz-item.component.html',
  styleUrl: './quiz-item.component.scss'
})

export class QuizItemComponent {
  @Input() quiz!: { id: number, title: string, description: string };
}
