import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { QuizService } from 'src/services/quiz.service';
import { Answer } from 'src/models/answer.model';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { MultiPlayerGameService } from 'src/services/multiplayer-game.service';
import { QuizAnswerMultiplayerComponent } from '../quiz-answer-multiplayer/quiz-answer-multiplayer.component';
import { findIndex, last } from 'rxjs';
import { each } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-quiz-answers',
  standalone: true,
  imports: [CommonModule, QuizAnswerComponent, QuizAnswerMultiplayerComponent],
  templateUrl: './quiz-answers.component.html',
  styleUrl: './quiz-answers.component.scss'
})
export class QuizAnswersComponent {

  private answers: Answer[] = [];

  private selectedAnswers: Answer[] = [];

  private hiddenAnswers: Answer[] = [];

  private REMOVE_WRONG_ANSWER_INTERVAL: number = 0;

  private removeWrongAnswerInterval: any;

  @Output()
  correct_answer: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  next_question: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(
    private currentProfileService: CurrentProfileService,
    private quizService: QuizService) {
      
      this.currentProfileService.current_profile$.subscribe((profile) =>{
        this.REMOVE_WRONG_ANSWER_INTERVAL = profile.REMOVE_WRONG_ANSWER_INTERVAL;
      })

    this.quizService.question$.subscribe((question) => {
      this.answers = this.shuffle(question.answers);
      this.selectedAnswers = [];

      // Nettoyage d'un éventuel intervalle précédent
      if (this.removeWrongAnswerInterval) {
        clearInterval(this.removeWrongAnswerInterval);
      }

      this.removeWrongAnswerInterval = setInterval(() => {
        const wrongAnswers = (this.answers.filter((answer => !answer.isCorrect)))
        if (wrongAnswers.length > 0) {
          const answerToRemove = wrongAnswers.shift();
          if(answerToRemove) {  
            const index = this.answers.indexOf(answerToRemove)
            this.answers.splice(index,1);
          }
        } else {
          clearInterval(this.removeWrongAnswerInterval); // stoppe l'intervalle si plus de mauvaises réponses
        }
      }, this.REMOVE_WRONG_ANSWER_INTERVAL);
    });
  }

  public getRole() {
    return this.currentProfileService.getCurrentProfile().role;
  }

  public getAnswers() {
    this.answers.filter((answer) => !this.hiddenAnswers.includes(answer));
    console.log(this.answers);
    return this.answers;
  }

  public isWrongAnswer(answer: Answer) {
    return answer.isCorrect;
  }

  private shuffle(answers: Answer[]): Answer[] {
    const shuffled = answers.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public answerSelected(answer: Answer) {
    if(answer.isCorrect){
      this.quizService.increaseScore(answer);
      this.selectedAnswers.push(answer);
      const lastCorrectAnswers = this.answers.filter((answer) => answer.isCorrect && !this.selectedAnswers.includes(answer));
      this.correct_answer.emit(true);
      if(lastCorrectAnswers.length == 0){
        this.next_question.emit(true);
      }
    } else {
      this.selectedAnswers.push(answer);
      this.hiddenAnswers.push(answer);
    }
  }
  
  public isAnswerHidden(answer: Answer){
    return this.hiddenAnswers.includes(answer);
  }

  public getMultiplayerAnswers() {
    const stats = [25, 15, 50, 10]
    for (let i = 0; i < stats.length; i++) { this.answers[i].stats = stats[i]; }
    return this.answers;
  }

}
