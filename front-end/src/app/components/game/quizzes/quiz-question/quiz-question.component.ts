import { Component, ElementRef, OnInit, OnDestroy,EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
import { RecordResultService } from 'src/services/record-result.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/services/websocket.service';


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

export class QuizQuestionComponent implements OnInit, OnDestroy {
  public showCorrectEffect: Boolean = false;
  public hintsActive: Boolean = false;
  public showQuestionPopUp: Boolean = false;
  private answerStartTime: number = Date.now();
  private subscriptions: Subscription[] = [];
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  private question!: Question;

  private wrongAnswers: Answer[] = [];



  public shuffledAnswers: Answer[] = [];


  private CORRECT_ANSWER_DELAY = 1500;

  private SHOW_POP_UP_TIMER = 10000;

  private hintTimer: any = null;

  private popUpTimer: any = null;

  private NUMBER_OF_PLAYER: number = 8;

  private GIVEN_ANSWERS_COUNTER: number = 5;

  private startTimeDate: number = -1;

  private endTimeDate: number = -1;

  constructor(private router: Router,
    private currentProfileService: CurrentProfileService,
    private quizService: QuizService,
    private gamemodeService: GamemodeService,
    private recordResultService: RecordResultService,
    private webSocketService: WebSocketService) {

    this.currentProfileService.current_profile$.subscribe((profile) => {
      this.SHOW_POP_UP_TIMER = profile.SHOW_POP_UP_TIMER;
    })

    this.quizService.question$.subscribe((question) => {
      this.question = question;

      this.startTimeDate = Date.now();


      if (this.getRole() === 'user') {

        if (this.getGamemode().id === 0) {
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
  
  ngOnInit() {
    // Initialiser le chronomètre pour la réponse
    this.answerStartTime = Date.now();
    
    if (this.getGamemode().id === 1) { // Si mode multijoueur
      // S'abonner aux changements de question
      this.subscriptions.push(
        this.webSocketService.currentQuestion$.subscribe(questionIndex => {
          if (questionIndex > 0) {
            // Réinitialiser le chronomètre
            this.answerStartTime = Date.now();
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getGamemode() {
    return this.gamemodeService.getCurrentGamemode();
  }

  public getRole() {
    return this.currentProfileService.getCurrentProfile().role;
  }

  ngOnChanges() { this.resetQuestion(); }

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


  public isWrongAnswer(answer: Answer): boolean {
    return this.wrongAnswers.some(
      wrong => wrong.id === answer.id && wrong.questionId === answer.questionId
    );
  }

  public getAllAnswers() { return this.question.answers; }

  public getTitle() { return this.question.question; }

  public getNbOfGivenAnswers(): number { return this.GIVEN_ANSWERS_COUNTER; }

  public getNbOfPlayers() { return this.NUMBER_OF_PLAYER; }

  public submitCorrectAnswer() {
    const currentQuestion = this.quizService.question;
    
    if (this.gamemodeService.getCurrentGamemode().id === 0) {
      // Mode solo - comportement existant
      this.showCorrectEffect = true;
      setTimeout(() => {
        this.showCorrectEffect = false;
      }, 1500);
    } else if (this.gamemodeService.getCurrentGamemode().id === 1) {
      // Mode multijoueur - utiliser WebSocket
      if (currentQuestion) {
        const timeTaken = Date.now() - this.answerStartTime;
        const correctAnswers = currentQuestion.answers
          .filter(answer => answer.isCorrect)
          .map(answer => answer.id);
        
        // Si c'est l'admin, collecter les statistiques
        if (this.getRole() === 'admin') {
          this.webSocketService.showQuestionResults(currentQuestion.id, correctAnswers);
        } else {
          // Pour les joueurs, rediriger vers la page d'attente
          this.router.navigate(["/answer-submitted"]);
        }
      }
    }
  }
  public validateQuestion() {
    if (this.gamemodeService.getCurrentGamemode().id === 0) {
      // Mode solo - comportement existant
      setTimeout(() => {
        this.quizService.nextQuestion();
      }, 1500);
    }
    // En mode multijoueur, c'est l'hôte qui décide de passer à la question suivante
  }
  
  public nextQuestion() {
    if (this.getGamemode().id === 0) {
      // Mode solo - comportement existant
      this.quizService.nextQuestion();
    } else if (this.getGamemode().id === 1 && this.getRole() === 'admin') {
      // Mode multijoueur - uniquement l'hôte peut passer à la question suivante
      this.webSocketService.nextQuestion();
    }
  }
  
  public previousQuestion() {
    if (this.getGamemode().id === 0 || this.getRole() === 'admin') {
      this.quizService.previousQuestion();
    }
  }
  
  public areHintsActive(): Boolean {
    return this.hintsActive;
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
  private recordQuestion() { }
}
