import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';



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
  
  goback() : void {
    this.goBack.emit()
  }
}