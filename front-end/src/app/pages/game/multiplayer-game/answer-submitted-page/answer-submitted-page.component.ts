import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-answer-submitted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer-submitted-page.component.html',
  styleUrl: './answer-submitted-page.component.scss'
})
export class AnswerSubmittedPageComponent implements OnInit, OnDestroy {
  public showNextQuestion: Boolean = false;
  public correctAnswer: Boolean = false;
  private subscriptions: Subscription[] = [];

  private valideQuestionTimer; 

  private redirectionTimer;

  private VALID_QUESTION_TIME:number = 1500;

  private REDIRECTION_TIME:number = 3000;

  constructor(private router: Router, private quizService: QuizService,    private webSocketService: WebSocketService
){
    this.valideQuestionTimer = setTimeout(() => {
      this.showNextQuestion = true;
      this.correctAnswer = true;
    }, this.VALID_QUESTION_TIME);
    
    this.redirectionTimer = setTimeout(() =>{
      this.router.navigate(["/multiplayer-game"])
      this.quizService.nextQuestion();
    }, this.REDIRECTION_TIME);
  }
   ngOnInit() {
    // S'abonner aux résultats de la question
    this.subscriptions.push(
      this.webSocketService.questionResults$.subscribe(results => {
        if (results) {
          this.showNextQuestion = true;
          this.correctAnswer = true; // On pourrait vérifier si la réponse est correcte
        }
      })
    );
    
    // S'abonner aux changements de question
    this.subscriptions.push(
      this.webSocketService.currentQuestion$.subscribe(questionIndex => {
        if (questionIndex > 0) {
          // Rediriger vers la page de jeu
          this.router.navigate(['/multiplayer-game']);
        }
      })
    );
    
    // S'abonner à la fin de la partie
    this.subscriptions.push(
      this.webSocketService.gameStatus$.subscribe(status => {
        if (status === 'completed') {
          this.router.navigate(['/quiz-multiplayer-scoreboard']);
        } else if (status === 'terminated') {
          this.router.navigate(['/']);
        }
      })
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

