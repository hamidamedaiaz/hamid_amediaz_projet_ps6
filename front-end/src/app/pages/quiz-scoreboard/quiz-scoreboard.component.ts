import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentQuizService } from 'src/services/current-quiz.service';

@Component({
  selector: 'app-quiz-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './quiz-scoreboard.component.html',
  styleUrl: './quiz-scoreboard.component.scss'
})
export class QuizScoreboardComponent implements OnInit {

  public score: number;
  public maxPoint: number | null;

  constructor(
    private router: Router, 
    private currentQuizService: CurrentQuizService,
    private elementRef: ElementRef
  ) {
    this.score = this.currentQuizService.getScore();
    this.maxPoint = this.currentQuizService.getNumberOfQuestions();
  }

  ngOnInit(): void {
    this.loadConfettiScript();
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

    // :) 

    // @ts-ignore
    const confetti = window.confetti;
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 1000,
        spread: 700000,
        origin: { y:0.5}
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 1000,
          spread: 100,
          origin: { y:0.6 }
        });
      }, 700);
    }
  }

  public replay() {
    console.log("replay");
    this.router.navigate(["/select-quiz"]);
  }

  public exit() {
    console.log("exiting the quiz...");
    this.router.navigate(["/"]);
  }
}