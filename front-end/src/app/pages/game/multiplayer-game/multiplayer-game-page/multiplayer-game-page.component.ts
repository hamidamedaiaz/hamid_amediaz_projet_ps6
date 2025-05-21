import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { CurrentPageService } from 'src/services/currentPage.service';
import { QuizQuestionComponent } from 'src/app/components/game/quizzes/quiz-question/quiz-question.component';
import { QuizService } from 'src/services/quiz.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-multiplayer-game-page',
  standalone: true,
  imports: [QuizQuestionComponent],
  templateUrl: './multiplayer-game-page.component.html',
  styleUrl: './multiplayer-game-page.component.scss'
})
export class MultiplayerGamePageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private answerStartTime: number = 0;
  private currentProfile: Profile | undefined;
  
    constructor(private router: Router, 
                private currentProfileService: CurrentProfileService, 
                private currentPageService:CurrentPageService,
                    private webSocketService: WebSocketService,

                private quizService: QuizService){
      this.currentProfileService.current_profile$.subscribe((currentProfile) => {
        this.currentProfile = currentProfile;
      })
      this.currentPageService.setCurrentPage("multiplayer-game-page")
    }
  ngOnInit() {
    // Initialiser le chronomètre pour la réponse
    this.answerStartTime = Date.now();
    
    // S'abonner aux changements de question
    this.subscriptions.push(
      this.webSocketService.currentQuestion$.subscribe(questionIndex => {
        if (questionIndex > 0) {
          // Charger la nouvelle question
          this.quizService.setQuestion(questionIndex);
          // Réinitialiser le chronomètre
          this.answerStartTime = Date.now();
        }
      })
    );
    
    // S'abonner aux résultats des questions
    this.subscriptions.push(
      this.webSocketService.questionResults$.subscribe(results => {
        if (results) {
          // Afficher les résultats de la question
          // (implémenté dans un autre composant)
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
    
    // S'abonner aux erreurs
    this.subscriptions.push(
      this.webSocketService.error$.subscribe(error => {
        if (error) {
          console.error('Erreur WebSocket:', error);
          // Afficher l'erreur à l'utilisateur
        }
      })
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  // Soumettre une réponse
  submitAnswer(answerId: number) {
    const currentQuestion = this.quizService.question;
    if (currentQuestion) {
      const timeTaken = Date.now() - this.answerStartTime;
      this.webSocketService.submitAnswer(currentQuestion.id, answerId, timeTaken);
      
      // Si c'est l'hôte, il peut voir la progression des réponses
      // Pour les joueurs, on les redirige vers une page d'attente
      if (this.currentProfileService.getCurrentProfile().role === 'admin') {
        // Rester sur la page pour voir la progression
      } else {
        this.router.navigate(['/answer-submitted']);
      }
    }
  }
  
  // Passer à la question suivante (visible uniquement pour l'hôte)
  nextQuestion() {
    // Vérifier que c'est l'hôte qui demande de passer à la question suivante
    if (this.currentProfileService.getCurrentProfile().role === 'admin') {
      this.webSocketService.nextQuestion();
    }
  }
  
  // Quitter la partie
  leaveQuiz() {
    this.webSocketService.leaveGame();
    this.quizService.resetCurrentQuiz();
    this.router.navigate(["/"]);
  }
}

  

