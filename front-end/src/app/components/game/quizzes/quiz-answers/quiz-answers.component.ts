import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { QuizService } from 'src/services/quiz.service';
import { Answer } from 'src/models/answer.model';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { MultiPlayerGameService } from 'src/services/multiplayer-game.service';
import { QuizAnswerMultiplayerComponent } from '../quiz-answer-multiplayer/quiz-answer-multiplayer.component';

@Component({
  selector: 'app-quiz-answers',
  standalone: true,
  imports: [CommonModule, QuizAnswerComponent, QuizAnswerMultiplayerComponent],
  templateUrl: './quiz-answers.component.html',
  styleUrl: './quiz-answers.component.scss'
})
export class QuizAnswersComponent {

  private allAnswers: Answer[] = [];

  private wrongAnswers: Answer[] = [];

  private correctAnswers: Answer[] = [];

  private selectedAnswers: Answer[] = [];

  private wrongAnswerSelected: Answer[] = [];

  private REMOVE_WRONG_ANSWER_INTERVAL: number = 0;

  private removeWrongAnswerInterval: any;

  @Output()
  correct_answer: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(
    private currentProfileService: CurrentProfileService,
    private quizService: QuizService) {
      
      this.currentProfileService.current_profile$.subscribe((profile) =>{
        this.REMOVE_WRONG_ANSWER_INTERVAL = profile.REMOVE_WRONG_ANSWER_INTERVAL;
      })

    this.quizService.question$.subscribe((question) => {
      this.wrongAnswers = [...question.answers];
      this.allAnswers = this.shuffle([...this.wrongAnswers]);
      this.selectedAnswers = [];

      // Nettoyage d'un éventuel intervalle précédent
      if (this.removeWrongAnswerInterval) {
        clearInterval(this.removeWrongAnswerInterval);
      }

      this.removeWrongAnswerInterval = setInterval(() => {
        if (this.wrongAnswers.length > 0) {
          const answerToRemove = this.wrongAnswers.shift();
          if (answerToRemove) {
            const index = this.allAnswers.indexOf(answerToRemove);
            if (index !== -1) {
              this.wrongAnswerSelected.push(answerToRemove);
            }
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
    return this.allAnswers;
  }

  public isWrongAnswer(answer: Answer) {
    if (this.wrongAnswers.includes(answer)) return true;
    return false;
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
    //this.correctAnswers.every(item => this.selectedAnswers.includes(item))
    if (this.selectedAnswers.includes(answer)) {
      this.correct_answer.emit(true);
    }
    else if (this.correctAnswers.includes(answer)) {
      this.correct_answer.emit(true);
      this.quizService.increaseScore(answer);
      this.selectedAnswers.push(answer);
    }

    else {
      this.wrongAnswerSelected.push(answer);
    }
  }

  public isWrongAnswerSelected(answer: Answer) {
    if (this.wrongAnswerSelected.includes(answer)) return true;
    return false;
  }

  public getMultiplayerAnswers() {
    const stats = [25, 15, 50, 10]
    for (let i = 0; i < stats.length; i++) { this.allAnswers[i].stats = stats[i]; }
    return this.allAnswers;
  }

}
