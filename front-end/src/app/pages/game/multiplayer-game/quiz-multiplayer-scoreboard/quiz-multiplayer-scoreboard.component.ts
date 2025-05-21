import { Component, OnInit, OnDestroy } from '@angular/core';
import { MultiplayerProfileListComponent } from 'src/app/components/game/multiplayer-game-setup/multiplayer-profile-list/multiplayer-profile-list.component';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { CommonModule } from '@angular/common';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { Router } from '@angular/router';
import { QuizQuestionComponent } from 'src/app/components/game/quizzes/quiz-question/quiz-question.component';
import { Question } from 'src/models/question.model';

import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/services/websocket.service';


@Component({
  selector: 'app-quiz-multiplayer-scoreboard',
  standalone: true,
  imports: [MultiplayerProfileListComponent, CommonModule, QuizQuestionComponent],
  templateUrl: './quiz-multiplayer-scoreboard.component.html',
  styleUrl: './quiz-multiplayer-scoreboard.component.scss'
})
export class QuizMultiplayerScoreboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public players: any[] = [];
  public displayQuestion: Boolean = false;
  private congrats_message: string = "Félicitation, vous avez terminé le quiz !";
  
  constructor(
    private router: Router,
    private webSocketService: WebSocketService,
    private quizService: QuizService,
    private currentProfileService: CurrentProfileService
  ) {}
  
  ngOnInit() {
    // Charger les joueurs triés par score
    this.subscriptions.push(
      this.webSocketService.players$.subscribe(players => {
        this.players = players.sort((a, b) => b.score - a.score);
      })
    );
    
    // Animation de confetti
    this.loadConfettiScript();
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  loadConfettiScript(): void {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
    script.onload = () => {
      this.triggerConfetti();
    };
    document.body.appendChild(script);
  }
  
  triggerConfetti(): void {
    // @ts-ignore
    const confetti = window.confetti;
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 1000,
        spread: 700000,
        origin: { y: 0.5 }
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 1000,
          spread: 100,
          origin: { y: 0.6 }
        });
      }, 700);
    }
  }
  
  public getQuizTitle() {
    return this.quizService.quiz.title;
  }
  
  public getQuizQuestions() {
    return this.quizService.quiz.questions;
  }
  
  public get_congrats_message() {
    return this.congrats_message;
  }
  
  public showQuestion(questionId: number) {
    this.displayQuestion = true;
    this.quizService.setQuestion(questionId);
  }
  
  public replay() {
    this.webSocketService.resetState();
    this.router.navigate(['/multiplayer-game-setup'])
  }
  
  public leaveQuiz() {
    this.webSocketService.leaveGame();
    this.quizService.resetCurrentQuiz();
    this.router.navigate(["/"]);
  }
  
  public getRole() {
    return this.currentProfileService.getCurrentProfile().role;
  }
}
