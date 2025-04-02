import { Component } from '@angular/core';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { QuizHintComponent } from '../quiz-hint/quiz-hint.component';
import { CommonModule } from '@angular/common';
import { Question } from 'src/models/question.model';
import { QUESTION } from 'src/mocks/question.mock';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [QuizAnswerComponent, QuizHintComponent, CommonModule],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss'
})

export class QuizQuestionComponent {
  private volume: number = 0;

  private question: Question = QUESTION;


  public setVolume(newVolume: number){
    this.volume = newVolume;
  }

  public getVolume(){
    return this.volume;
  }

  public getHints(){
    return this.question.hints;
  }

  public getAnswers(){
    return this.question.answers.concat(this.question.correctAnswer);
  }

  public getTitle(){
    return this.question.question
  }
  
  public increaseVolume(){
    this.volume++;
  }

  public decreaseVolume(){
    if(this.volume > 0) this.volume--;
  }

  public answerSelected(answer:Answer){
    console.log("answer selected: ", answer)
  }

}
