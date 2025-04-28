import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { QuizHintComponent } from '../quiz-hint/quiz-hint.component';
import { CommonModule } from '@angular/common';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { CurrentQuizService } from 'src/services/current-quiz.service';
import { GamemodeService } from 'src/services/gamemode.service';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [QuizAnswerComponent, QuizHintComponent, CommonModule],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss'
})

export class QuizQuestionComponent {

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  @Input()
  context: String | null = null;

  @Input()
  question: Question | null = null;

  @Output()
  nextQuestionEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  previousQuestionEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  correctAnswerEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  private volume: number = 50;

  private currentProfile: Profile | undefined;

  private wrongAnswers: Answer[] = [];

  public showCorrectEffect: Boolean = false;
  public showSuccessMessage: Boolean = false;
  public successMessage: string = "BONNE RÉPONSE !";


  public hintsActive: Boolean = false;

  public shuffledAnswers: Answer[] = [];

  private HINT_TIME_OUT_DURATION = 2000;
  private CORRECT_ANSWER_DELAY = 1500;

  private hintTimer: any = null;

  private NUMBER_OF_PLAYER: number = 8;

  private GIVEN_ANSWERS_COUNTER: number = 5;

  constructor(private router: Router, 
              private currentProfileService: CurrentProfileService, 
              private currentQuizService: CurrentQuizService,
              private gamemodeService : GamemodeService) {
    this.currentProfileService.current_profile$.subscribe((currentProfile) => {
      this.currentProfile = currentProfile;
    })

    if (this.context !== 'admin') {

      this.clearHintTimeOut();

      this.hintTimer = setTimeout(() => {
        this.hintsActive = true;
      }, this.HINT_TIME_OUT_DURATION);
    }
  }


  ngOnChanges() {
    if (this.question) {
      this.shuffledAnswers = this.shuffle(this.question.answers.concat(this.question.correctAnswer));
      this.resetQuestion();
    }
  }

  private clearHintTimeOut() {
    if (this.hintTimer) {
      clearTimeout(this.hintTimer)
    }
  }

  public showHints() {
    this.hintsActive = !this.hintsActive
  }

  public resetQuestion() {
    this.hintsActive = false;
    this.wrongAnswers = [];
    this.showSuccessMessage = false;
    this.GIVEN_ANSWERS_COUNTER = 0;
  }



  public getHints() {
    if (this.question) return this.question.hints;
    return null;
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
    if (this.question) {
      return (this.question.answers.concat(this.question.correctAnswer));
    }
    return null;
  }

  public getTitle() {
    if (this.question) return this.question.question;
    return null;
  }

  public getNbOfGivenAnswers(): number {
    return this.GIVEN_ANSWERS_COUNTER;
  }

  public getNbOfPlayers() {
    return this.NUMBER_OF_PLAYER;
  }



  public answerSelected(answer: Answer) {
    if (this.question) {
      const isCorrect = this.question.correctAnswer.some(
        (correct) => correct.answerId === answer.answerId
      );

      if (isCorrect) {
        if (this.gamemodeService.getCurrentGamemode().name === 'Solo') {
          this.showCorrectEffect = true;
          this.clearHintTimeOut();
          setTimeout(() => {
            this.showCorrectEffect = false;
            this.currentQuizService.increaseScore(answer);
            this.nextQuestionEmitter.emit(true);
          }, this.CORRECT_ANSWER_DELAY);
        }
        else if(this.gamemodeService.getCurrentGamemode().name === 'Multi'){
          console.log("ooo")
          this.router.navigate(["/answer-submitted"]);
        }
      } else {
        this.wrongAnswers.push(answer);
      }
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
    this.nextQuestionEmitter.emit(true);
  }

  public previousQuestion() {
    this.wrongAnswers = [];
    this.previousQuestionEmitter.emit(true);
  }

  private shuffle(answers: Answer[]): Answer[] {
    const shuffled = answers.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public areHintsActive(): Boolean {
    return this.hintsActive;
  }

  // MULTIPLAYER GAME CONTROL

  // MUSIC CONTROL 

  public restartMusic() {
    console.log("restarting the music...");
  }

  public getAudioPath() {
    if (this.question) return this.question.audioPath;
    return null;
  }

  public setVolume(newVolume: number) {
    this.volume = newVolume;
  }

  public getVolume() {
    return this.volume;
  }

  public increaseVolume() {
    if (this.volume < 100) {
      this.volume += 10;
      console.log("increasing the volume");
    }
  }

  public decreaseVolume() {
    if (this.volume > 0) {
      this.volume -= 10;
      console.log("decreasing the volume");
    }
  }
}