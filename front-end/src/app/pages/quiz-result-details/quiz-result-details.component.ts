import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from 'src/services/quiz-list.service';
import { ProfileService } from 'src/services/profile.service';
import { Quiz } from 'src/models/quiz.model';
import { Profile } from 'src/models/profile.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { QuizResultHeaderComponent } from 'src/app/components/admin/quiz-results/quiz-result-header/quiz-result-header.component';
import { QuizResultInfoComponent } from "../../components/admin/quiz-results/quiz-result-info/quiz-result-info.component";
import { Input } from '@angular/core';



interface QuestionResult {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  hintsUsed: number;
  userAnswerPercentage: number; 
  allAnswerPercentages: { answer: string, percent: number, isCorrect: boolean }[];
}



@Component({
  selector: 'app-quiz-result-details',
  standalone: true,
  imports: [CommonModule, RouterLink, QuizResultHeaderComponent, QuizResultInfoComponent],
  templateUrl: './quiz-result-details.component.html',
  styleUrl: './quiz-result-details.component.scss'
})
export class QuizResultDetailsComponent implements OnInit {
  quizId: number = 0;
  profileId: number = 0;
  quiz: Quiz | null = null;
  profile: Profile | null = null;
  
  @Input()quizDate: string = '';
  score: number = 0;
  totalQuestions: number = 0;
  percentage: number = 0;
  averageTimePerQuestion: number = 0;
  @Input()totalIndicetsUsed: number = 0;
  
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
    this.quizService.quizzes$.subscribe(quizzes => {
      this.quiz = quizzes.find(q => q.id === this.quizId) || null;
      if (!this.quiz) {
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
    this.totalQuestions = 10;


    this.score = 8; 


    this.percentage = Math.round((this.score / this.totalQuestions) * 100);
    this.averageTimePerQuestion = 5; 
    
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
        timeSpent: Math.floor(Math.random() * 15) + 3, 


        hintsUsed: Math.floor(Math.random() * 3),
        userAnswerPercentage: percentages[userAnswerIdx],
        allAnswerPercentages: allAnswerPercentages
      });
    }
    
    return results;
  }
  
  generateRandomPercentages(count: number): number[] {
    const percentages: number[] = [];
    let remainingPercent = 100;
    
    for (let i = 0; i < count - 1; i++) {
      const max = remainingPercent - (count - i - 1);
      const percent = Math.floor(Math.random() * max) + 1;
      percentages.push(percent);
      remainingPercent -= percent;
    }
    
    percentages.push(remainingPercent); 
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