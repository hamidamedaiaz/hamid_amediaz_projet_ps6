import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { QuizHintComponent } from '../quiz-hint/quiz-hint.component';
import { QuizHintsComponent } from '../quiz-hints/quiz-hints.component';
import { CommonModule } from '@angular/common';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { GamemodeService } from 'src/services/gamemode.service';
import { Gamemode } from 'src/models/gamemode.model';
import { GAMEMODE_UNDEFINED } from 'src/mocks/gamemode-list.mock';
import { MusicControlComponent } from '../music-control/music-control.component';
import { QuizQuestionHeaderComponent } from '../quiz-question-header/quiz-question-header.component';
import { QuizQuestionPopUpComponent } from '../quiz-question-pop-up/quiz-question-pop-up.component';
import { QuizAnswersComponent } from '../quiz-answers/quiz-answers.component';


@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [QuizAnswerComponent,
    CommonModule,
    MusicControlComponent,
    QuizHintsComponent,
    QuizQuestionHeaderComponent,
    QuizQuestionPopUpComponent,
    QuizAnswersComponent],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss'
})

export class QuizQuestionComponent {

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  private question!: Question;

  private gamemode: Gamemode = GAMEMODE_UNDEFINED

  private wrongAnswers: Answer[] = [];

  public showCorrectEffect: Boolean = false;

  public hintsActive: Boolean = false;

  public shuffledAnswers: Answer[] = [];

  public showQuestionPopUp: Boolean = false;


  private CORRECT_ANSWER_DELAY = 1500;

  private SHOW_POP_UP_TIMER = 10000;

  private hintTimer: any = null;

  private popUpTimer: any = null;

  private NUMBER_OF_PLAYER: number = 8;

  private GIVEN_ANSWERS_COUNTER: number = 5;

  constructor(private router: Router,
    private currentProfileService: CurrentProfileService,
    private quizService: QuizService,
    private gamemodeService: GamemodeService) {

    this.currentProfileService.current_profile$.subscribe((profile) => {
      this.SHOW_POP_UP_TIMER = profile.SHOW_POP_UP_TIMER;
    })

    this.quizService.question$.subscribe((question) => {
      this.question = question;


      if (this.getRole() === 'user') {

        console.log("user ", this.currentProfileService.getCurrentProfile())

        if (this.getGamemode() === 'Solo') {
          //SHOW POP-UP TIMER
          this.clearPopUpTimer();
          this.popUpTimer = setTimeout(() => {
            this.showQuestionPopUp = true;
          }, this.SHOW_POP_UP_TIMER)
        }
        if (this.question.hints.length > 0) {

          //SHOW HINT TIMER
          this.clearHintTimeOut();
          this.hintTimer = setTimeout(() => {
            this.hintsActive = true;
          }, this.currentProfileService.get_hint_display_time_out_duration());
        }
      }
    })
  }

  public getGamemode() {
    this.gamemode = this.gamemodeService.getCurrentGamemode();
    return this.gamemode.name;
  }

  public getRole() {
    return this.currentProfileService.getCurrentProfile().role;
  }

  ngOnChanges() {
    this.resetQuestion();
  }

  private clearHintTimeOut() {
    if (this.hintTimer) {
      clearTimeout(this.hintTimer)
      this.hintsActive = false;
    }
  }

  private clearPopUpTimer(): void {
    if (this.popUpTimer) {
      clearTimeout(this.popUpTimer)
      this.showQuestionPopUp = false;
    }
  }

  public showHints() {
    this.hintsActive = !this.hintsActive
  }

  public resetQuestion() {
    this.hintsActive = false;
    this.wrongAnswers = [];
    this.GIVEN_ANSWERS_COUNTER = 0;
  }

  public getHints() {
    return this.question.hints;
  }

  public getAnswers() {
    return this.shuffledAnswers;
  }


  public isWrongAnswer(answer: Answer): boolean {
    return this.wrongAnswers.some(
      wrong => wrong.answerId === answer.answerId && wrong.questionId === answer.questionId
    );
  }

  public getAllAnswers() {
    return (this.question.answers.concat(this.question.correctAnswers));

  }

  public getTitle() {
    return this.question.question;

  }

  public getNbOfGivenAnswers(): number {
    return this.GIVEN_ANSWERS_COUNTER;
  }

  public getNbOfPlayers() {
    return this.NUMBER_OF_PLAYER;
  }

  public submitCorrectAnswer() {

    if (this.gamemodeService.getCurrentGamemode().name === 'Solo') {
      this.showCorrectEffect = true;
      this.clearHintTimeOut(); //a voir en fonction des préférences
      setTimeout(() => {
        this.showCorrectEffect = false;
        this.clearHintTimeOut();
        this.quizService.nextQuestion();
      }, this.CORRECT_ANSWER_DELAY);
    }
    else if (this.gamemodeService.getCurrentGamemode().name === 'Multi') {
      this.router.navigate(["/answer-submitted"]);
    }

  }


  public getAnswersPercents() {
    const percent: number[] = [15, 50, 25, 10]
    const answerWithPercents: Object[] = [];
    const allAnswers = this.getAllAnswers()
    if (this.question && allAnswers) {
      for (let i = 0; i < allAnswers.length; i++) {
        answerWithPercents.push({ answer: allAnswers[i], percent: percent[i] })
      }
    }
    return answerWithPercents;
  }

  public nextQuestion() {
    this.wrongAnswers = [];
    this.quizService.nextQuestion();
  }

  public previousQuestion() {
    this.wrongAnswers = [];
    this.quizService.previousQuestion();
  }

  public areHintsActive(): Boolean {
    return this.hintsActive;
  }

  public getAudioPath(): string {
    return this.question.audioPath;

  }

  public getVolume(): number { return 50; }

  public CancelPopPup() {
    this.showQuestionPopUp = false;
  }

  public isQuizRunning() {
    return this.quizService.isQuizRunning;
  }
}