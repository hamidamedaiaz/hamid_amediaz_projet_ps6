import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { QuizService } from 'src/services/quiz.service';
import { Answer } from 'src/models/answer.model';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { MultiPlayerQuizService } from 'src/services/multi-player-quiz.service';
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

  @Output()
  correct_answer: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private currentProfileService: CurrentProfileService,
    private quizService: QuizService,
    private multiplayerQuizService: MultiPlayerQuizService) {
    this.quizService.question$.subscribe((question) => {
      console.log(question)
      this.allAnswers = this.shuffle(question.answers.concat(question.correctAnswers));
      this.wrongAnswers = question.answers;
      this.correctAnswers = question.correctAnswers;
      this.selectedAnswers = [];
      console.log("all answers", this.allAnswers);
    })
  }

  public getRole() {
    return this.currentProfileService.getCurrentProfile().role;
  }

  public getAnswers() {
    console.log(this.allAnswers);
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
    for(let i = 0; i < stats.length; i ++){
      this.allAnswers[i].stats = stats[i];
    }
    return this.allAnswers;
  }

}
