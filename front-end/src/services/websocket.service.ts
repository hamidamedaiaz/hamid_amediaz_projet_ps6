import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';
import { CurrentProfileService } from './currentProfile.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private serverUrl = 'http://localhost:9428'; // URL du serveur WebSocket
  
  // Observables pour les données de la session
  public gameCode$ = new BehaviorSubject<string>('');
  public players$ = new BehaviorSubject<any[]>([]);
  public gameStatus$ = new BehaviorSubject<string>('waiting');
  public currentQuestion$ = new BehaviorSubject<number>(0);
  public answerCount$ = new BehaviorSubject<number>(0);
  public questionResults$ = new BehaviorSubject<any>(null);
  public gameResults$ = new BehaviorSubject<any>(null);
  public error$ = new BehaviorSubject<string>('');
  
  private gameCode: string = '';
  
  constructor(private currentProfileService: CurrentProfileService) {
    this.socket = io(this.serverUrl);
    this.setupSocketListeners();
  }
  
  // Configuration des écouteurs d'événements Socket.IO
  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
    });
    
    this.socket.on('disconnect', () => {
      console.log('Déconnecté du serveur WebSocket');
    });
    
    this.socket.on('game-created', (data) => {
      this.gameCode = data.gameCode;
      this.gameCode$.next(data.gameCode);
      console.log(`Session de jeu créée avec le code: ${data.gameCode}`);
    });
    
    this.socket.on('player-joined', (data) => {
      this.players$.next(data.players);
      console.log(`Joueur rejoint: ${JSON.stringify(data.player.name)}`);
    });
    
    this.socket.on('game-started', (data) => {
      this.gameStatus$.next('playing');
      this.currentQuestion$.next(data.currentQuestion);
      console.log('La partie a commencé');
    });
    
    this.socket.on('answer-received', (data) => {
      this.answerCount$.next(data.answerCount);
      console.log(`Réponses reçues: ${data.answerCount}/${data.totalPlayers}`);
    });
    
    this.socket.on('question-changed', (data) => {
      this.currentQuestion$.next(data.currentQuestion);
      this.answerCount$.next(0);
      console.log(`Changement de question: ${data.currentQuestion}`);
    });
    
    this.socket.on('question-results', (data) => {
      this.questionResults$.next(data);
      this.players$.next(data.players);
      console.log('Résultats de la question reçus');
    });
    
    this.socket.on('game-completed', (data) => {
      this.gameStatus$.next('completed');
      this.gameResults$.next(data);
      this.players$.next(data.players);
      console.log('Partie terminée');
    });
    
    this.socket.on('game-terminated', (data) => {
      this.error$.next(data.message);
      this.gameStatus$.next('terminated');
      console.log(`Partie terminée: ${data.message}`);
    });
    
    this.socket.on('player-left', (data) => {
      this.players$.next(data.players);
      console.log(`Joueur parti: ${data.playerId}`);
    });
    
    this.socket.on('error', (data) => {
      this.error$.next(data.message);
      console.error(`Erreur: ${data.message}`);
    });
  }
  
  // Créer une session de jeu
  createGame(quiz: Quiz) {
    const host = this.currentProfileService.getCurrentProfile();
    this.socket.emit('create-game', {
      quizId: quiz.id,
      host: {
        id: host.id,
        name: host.name,
        lastName: host.lastName,
        socketId: this.socket.id,
        profilePicture: host.profilePicture
      },
      totalQuestions: quiz.questions.length
    });
  }
  
  // Rejoindre une session de jeu
  joinGame(gameCode: string) {
    const player = this.currentProfileService.getCurrentProfile();
    this.gameCode = gameCode;
    this.socket.emit('join-game', {
      gameCode,
      player: {
        id: player.id,
        name: player.name,
        lastName: player.lastName,
        socketId: this.socket.id,
        profilePicture: player.profilePicture
      }
    });
  }
  
  // Démarrer la partie
  startGame() {
    this.socket.emit('start-game', {
      gameCode: this.gameCode
    });
  }
  
  // Soumettre une réponse
  submitAnswer(questionId: number, answerId: number, timeTaken: number) {
    const playerId = this.currentProfileService.getCurrentProfile().id;
    this.socket.emit('submit-answer', {
      gameCode: this.gameCode,
      playerId,
      questionId,
      answerId,
      timeTaken
    });
  }
  
  // Passer à la question suivante
  nextQuestion() {
    this.socket.emit('next-question', {
      gameCode: this.gameCode
    });
  }
  
  // Afficher les résultats d'une question
  showQuestionResults(questionId: number, correctAnswerIds: number[]) {
    this.socket.emit('show-question-results', {
      gameCode: this.gameCode,
      questionId,
      correctAnswerIds
    });
  }
  
  // Quitter la partie
  leaveGame() {
    const playerId = this.currentProfileService.getCurrentProfile().id;
    this.socket.emit('leave-game', {
      gameCode: this.gameCode,
      playerId
    });
    this.resetState();
  }
  
  // Réinitialiser l'état du service
  resetState() {
    this.gameCode = '';
    this.gameCode$.next('');
    this.players$.next([]);
    this.gameStatus$.next('waiting');
    this.currentQuestion$.next(0);
    this.answerCount$.next(0);
    this.questionResults$.next(null);
    this.gameResults$.next(null);
    this.error$.next('');
  }
  
  // Obtenir le code de la partie
  getGameCode() {
    return this.gameCode;
  }
  
  // Déconnecter du serveur WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}