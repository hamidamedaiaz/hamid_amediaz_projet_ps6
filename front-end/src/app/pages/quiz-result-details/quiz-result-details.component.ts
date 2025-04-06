import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from 'src/services/quiz-list.service';
import { ProfileService } from 'src/services/profile.service';
import { Quiz } from 'src/models/quiz.model';
import { Profile } from 'src/models/profile.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

interface QuestionResult {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  hintsUsed: number;
}

@Component({
  selector: 'app-quiz-result-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz-result-details.component.html',
  styleUrl: './quiz-result-details.component.scss'
})
export class QuizResultDetailsComponent implements OnInit {
  quizId: number | null = null;
  quiz: Quiz | null = null;
  profile: Profile | null = null;
  
  // Données du résultat
  quizDate: string = '';
  score: number = 0;
  totalQuestions: number = 0;
  percentageCorrect: number = 0;
  averageTimePerQuestion: number = 0;
  totalHintsUsed: number = 0;
  
  // Résultats des questions individuelles
  questionResults: QuestionResult[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizId = Number(params['id']);
      if (this.quizId) {
        this.loadQuizData();
        this.loadProfileData();
        this.loadQuizResults();
      } else {
        this.router.navigate(['/admin']);
      }
    });
  }
  
  loadQuizData() {
    if (!this.quizId) return;
    
    this.quizService.quiz$.subscribe(quizzes => {
      this.quiz = quizzes.find(q => q.id === this.quizId) || null;
      if (!this.quiz) {
        // Si on ne trouve pas le quiz, on génère des données fictives pour démonstration
        this.quiz = {
          id: this.quizId,
          title: "Quiz Années 80",
          description: "Les meilleurs hits des années 80",
          questions: this.generateMockQuestions()
        };
      }
      this.totalQuestions = this.quiz.questions.length;
    });
  }
  
  loadProfileData() {
    // Pour la démo, on utilise un ID fixe, mais dans une application réelle,
    // cette information viendrait probablement d'un service ou d'un état global
    const profileId = 1; 
    
    this.profileService.profiles$.subscribe(profiles => {
      this.profile = profiles.find(p => p.id === profileId) || null;
    });
  }
  
  loadQuizResults() {
    // Génération de données fictives pour la démo
    this.quizDate = new Date().toLocaleDateString();
    this.score = Math.floor(Math.random() * 10) + 10; // Score entre 10 et 20
    this.totalQuestions = 20;
    this.percentageCorrect = Math.round((this.score / this.totalQuestions) * 100);
    this.averageTimePerQuestion = Math.floor(Math.random() * 10) + 5; // 5-15 seconds
    this.totalHintsUsed = Math.floor(Math.random() * 10); // 0-10 hints
    
    this.questionResults = this.generateMockQuestionResults();
  }
  
  generateMockQuestions(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 20; i++) {
      const correctAnswer: Answer = {
        questionId: i,
        answerId: 1,
        answerContent: `Réponse correcte ${i + 1}`
      };
      
      const answers: Answer[] = [
        { questionId: i, answerId: 2, answerContent: `Mauvaise réponse A pour Q${i + 1}` },
        { questionId: i, answerId: 3, answerContent: `Mauvaise réponse B pour Q${i + 1}` },
        { questionId: i, answerId: 4, answerContent: `Mauvaise réponse C pour Q${i + 1}` }
      ];
      
      questions.push({
        questionId: i,
        question: `Question ${i + 1}: Quel est le titre de cette chanson des années 80?`,
        answers: answers,
        correctAnswer: [correctAnswer],
        audioPath: "/assets/musics/sample.mp3"
      });
    }
    
    return questions;
  }
  
  generateMockQuestionResults(): QuestionResult[] {
    const results: QuestionResult[] = [];
    
    for (let i = 0; i < this.totalQuestions; i++) {
      const isCorrect = Math.random() > 0.3; // 70% de chance d'avoir une réponse correcte
      
      results.push({
        question: `Question ${i + 1}: Quel est le titre de cette chanson des années 80?`,
        correctAnswer: `Réponse correcte ${i + 1}`,
        userAnswer: isCorrect ? `Réponse correcte ${i + 1}` : `Mauvaise réponse A pour Q${i + 1}`,
        isCorrect: isCorrect,
        timeSpent: Math.floor(Math.random() * 15) + 3, // 3-18 seconds
        hintsUsed: Math.floor(Math.random() * 3) // 0-2 hints
      });