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
  userAnswerPercentage: number; // % des joueurs qui ont choisi cette réponse
  allAnswerPercentages: { answer: string, percent: number, isCorrect: boolean }[];
}

@Component({
  selector: 'app-quiz-result-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz-result-details.component.html',
  styleUrl: './quiz-result-details.component.scss'
})
export class QuizResultDetailsComponent implements OnInit {
  quizId: number = 0;
  profileId: number = 0;
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
      this.profileId = Number(params['profileId']);
      this.quizId = Number(params['quizId']);
      
      if (this.profileId && this.quizId) {
        this.loadProfileData();
        this.loadQuizData();
        this.generateQuizResultsData();
      } else {
        this.router.navigate(['/admin']);
      }
    });
  }
  
  loadProfileData() {
    this.profileService.profiles$.subscribe(profiles => {
      this.profile = profiles.find(p => p.id === this.profileId) || null;
      if (!this.profile) {
        this.router.navigate(['/admin']);
      }
    });
  }
  
  loadQuizData() {
    this.quizService.quiz$.subscribe(quizzes => {
      this.quiz = quizzes.find(q => q.id === this.quizId) || null;
      if (!this.quiz) {
        // Si on ne trouve pas le quiz, on génère des données fictives pour démonstration
        this.quiz = {
          id: this.quizId,
          title: "Quiz Exemple",
          description: "Quiz généré pour démonstration",
          questions: this.generateMockQuestions()
        };
      }
      this.totalQuestions = this.quiz.questions.length;
    });
  }
  
  generateQuizResultsData() {
    // Génération de données simulées pour la démonstration
    this.quizDate = this.getRandomDate();
    this.totalQuestions = Math.floor(Math.random() * 5) + 10; // 10-15 questions
    this.score = Math.floor(Math.random() * (this.totalQuestions - 5)) + 5; // Score entre 5 et totalQuestions
    this.percentageCorrect = Math.round((this.score / this.totalQuestions) * 100);
    this.averageTimePerQuestion = Math.floor(Math.random() * 10) + 5; // 5-15 seconds
    this.totalHintsUsed = Math.floor(Math.random() * 10); // 0-10 hints
    
    this.questionResults = this.generateMockQuestionResults();
  }
  
  generateMockQuestions(): Question[] {
    const questions: Question[] = [];
    
    for (let i = 0; i < 10; i++) {
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
        audioPath: "/assets/musics/sample.mp3",
        hints: ["Indice 1", "Indice 2", "Indice 3"]
      });
    }
    
    return questions;
  }
  
  generateMockQuestionResults(): QuestionResult[] {
    const results: QuestionResult[] = [];
    const questions = this.quiz?.questions || this.generateMockQuestions();
    
    for (let i = 0; i < questions.length; i++) {
      const isCorrect = Math.random() > 0.3; // 70% de chance d'avoir une réponse correcte
      const question = questions[i];
      const correctAnswerContent = question.correctAnswer[0]?.answerContent || "Réponse correcte";
      
      // Générer des pourcentages de réponses aléatoires (total 100%)
      const percentages = this.generateRandomPercentages(4);
      const allAnswers = [...question.answers, ...question.correctAnswer];
      
      const allAnswerPercentages = allAnswers.map((answer, idx) => {
        return {
          answer: answer.answerContent,
          percent: percentages[idx],
          isCorrect: question.correctAnswer.some(ca => ca.answerId === answer.answerId)
        };
      });
      
      const userAnswerIdx = isCorrect ? 
        allAnswers.findIndex(a => question.correctAnswer.some(ca => ca.answerId === a.answerId)) : 
        Math.floor(Math.random() * question.answers.length);
      
      const userAnswer = allAnswers[userAnswerIdx]?.answerContent || 
        (isCorrect ? correctAnswerContent : `Mauvaise réponse pour Q${i + 1}`);
      
      results.push({
        question: question.question,
        correctAnswer: correctAnswerContent,
        userAnswer: userAnswer,
        isCorrect: isCorrect,
        timeSpent: Math.floor(Math.random() * 15) + 3, // 3-18 seconds
        hintsUsed: Math.floor(Math.random() * 3), // 0-2 hints
        userAnswerPercentage: percentages[userAnswerIdx],
        allAnswerPercentages: allAnswerPercentages
      });
    }
    
    return results;
  }
  
  generateRandomPercentages(count: number): number[] {
    // Génère des pourcentages aléatoires qui totalisent 100%
    const percentages: number[] = [];
    let remainingPercent = 100;
    
    for (let i = 0; i < count - 1; i++) {
      const max = remainingPercent - (count - i - 1);
      const percent = Math.floor(Math.random() * max) + 1;
      percentages.push(percent);
      remainingPercent -= percent;
    }
    
    percentages.push(remainingPercent); // Le dernier pourcentage prend le reste
    return percentages;
  }

  getRandomDate(): string {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - Math.floor(Math.random() * 60));
    return pastDate.toLocaleDateString();
  }

  getScoreClass(isCorrect: boolean): string {
    return isCorrect ? 'correct' : 'incorrect';
  }

  navigateBack() {
    this.router.navigate(['/player-stats', this.profileId]);
  }
}