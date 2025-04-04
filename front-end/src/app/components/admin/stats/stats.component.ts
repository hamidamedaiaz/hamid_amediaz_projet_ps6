import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';

interface GameHistory {
  date: string;
  quizTitle: string;
  score: number;
  time: string;
}

interface MonthProgress {
  month: string;
  score: number;
}

interface TopPlayer {
  name: string;
  lastName: string;
  score: number;
  date: string;
  time: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  // Vue courante
  currentView: 'accueilli' | 'quiz' = 'accueilli';

  // Listes de données
  profiles: Profile[] = [];
  quizzes: Quiz[] = [];

  // Éléments sélectionnés pour les modaux
  selectedProfile: Profile | null = null;
  selectedQuiz: Quiz | null = null;

  // Pagination
  readonly ITEMS_PER_PAGE = 5;
  currentAccueilliPage = 1;
  currentQuizPage = 1;

  // Recherche et tri
  accueilliSearchQuery = '';
  quizSearchQuery = '';
  accueilliSortBy = 'name';
  quizSortBy = 'title';

  // Pour simulation des données
  private readonly months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  private readonly difficulties = ['Facile', 'Moyen', 'Difficile'];

  constructor(
    private profileService: ProfileService,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    // Charger les profils
    this.profileService.profiles$.subscribe(profiles => {
      this.profiles = profiles;
    });

    // Charger les quiz
    this.quizService.quiz$.subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  // Méthodes de navigation
  showAccueilliStats() {
    this.currentView = 'accueilli';
    this.selectedProfile = null;
    this.selectedQuiz = null;
  }

  showQuizStats() {
    this.currentView = 'quiz';
    this.selectedProfile = null;
    this.selectedQuiz = null;
  }

  // Méthodes pour les profils
  viewProfileDetails(profile: Profile) {
    this.selectedProfile = profile;
  }

  closeProfileDetails() {
    this.selectedProfile = null;
  }

  // Méthodes pour les quiz
  viewQuizDetails(quiz: Quiz) {
    this.selectedQuiz = quiz;
  }

  closeQuizDetails() {
    this.selectedQuiz = null;
  }

  // Méthodes de filtrage et pagination
  filteredProfiles() {
    let filtered = [...this.profiles];
    
    // Appliquer le filtre de recherche
    if (this.accueilliSearchQuery) {
      const query = this.accueilliSearchQuery.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(query) || 
        profile.lastName.toLowerCase().includes(query)
      );
    }
    
    // Appliquer le tri
    filtered.sort((a, b) => {
      switch (this.accueilliSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'count':
          return this.getQuizCountForProfile(b) - this.getQuizCountForProfile(a);
        case 'score':
          return this.getAverageScore(b) - this.getAverageScore(a);
        default:
          return 0;
      }
    });
    
    // Pagination
    const startIndex = (this.currentAccueilliPage - 1) * this.ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + this.ITEMS_PER_PAGE);
  }

  filteredQuizzes() {
    let filtered = [...this.quizzes];
    
    // Appliquer le filtre de recherche
    if (this.quizSearchQuery) {
      const query = this.quizSearchQuery.toLowerCase();
      filtered = filtered.filter(quiz => 
        quiz.title.toLowerCase().includes(query) || 
        quiz.description.toLowerCase().includes(query)
      );
    }
    
    // Appliquer le tri
    filtered.sort((a, b) => {
      switch (this.quizSortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'plays':
          return this.getQuizPlayCount(b) - this.getQuizPlayCount(a);
        case 'score':
          return this.getQuizAverageScore(b) - this.getQuizAverageScore(a);
        default:
          return 0;
      }
    });
    
    // Pagination
    const startIndex = (this.currentQuizPage - 1) * this.ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + this.ITEMS_PER_PAGE);
  }

  changePage(view: 'accueilli' | 'quiz', page: number) {
    if (view === 'accueilli') {
      this.currentAccueilliPage = page;
    } else {
      this.currentQuizPage = page;
    }
  }

  getAccueilliTotalPages(): number {
    let filteredProfiles = [...this.profiles];
    
    if (this.accueilliSearchQuery) {
      const query = this.accueilliSearchQuery.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.name.toLowerCase().includes(query) || 
        profile.lastName.toLowerCase().includes(query)
      );
    }
    
    return Math.ceil(filteredProfiles.length / this.ITEMS_PER_PAGE);
  }

  getQuizTotalPages(): number {
    let filteredQuizzes = [...this.quizzes];
    
    if (this.quizSearchQuery) {
      const query = this.quizSearchQuery.toLowerCase();
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.title.toLowerCase().includes(query) || 
        quiz.description.toLowerCase().includes(query)
      );
    }
    
    return Math.ceil(filteredQuizzes.length / this.ITEMS_PER_PAGE);
  }

  // Méthodes utilitaires
  truncateDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 97) + '...' : description;
  }

  getInitials(profile: Profile): string {
    return (profile.name.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
  }

  // Méthodes de calcul pour les profils (simulées)
  getQuizCountForProfile(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 20) + 1;
  }

  getBestScore(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 30) + 70;
  }

  getAverageScore(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 20) + 60;
  }

  getLastPlayedDate(profile: Profile): string {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  }

  getProfileGameHistory(profile: Profile): GameHistory[] {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    const history: GameHistory[] = [];
    const historyCount = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < historyCount; i++) {
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 60);
      const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      
      const randomQuizIndex = Math.floor(Math.random() * this.quizzes.length);
      const quizTitle = this.quizzes[randomQuizIndex]?.title || 'Quiz Années 80';
      
      history.push({
        date: date.toLocaleDateString(),
        quizTitle: quizTitle,
        score: Math.floor(Math.random() * 30) + 60,
        time: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
      });
    }
    
    // Trier par date décroissante
    return history.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }

  getProfileProgress(profile: Profile): MonthProgress[] {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    const progress: MonthProgress[] = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      progress.push({
        month: this.months[monthIndex],
        score: Math.floor(Math.random() * 30) + 60
      });
    }
    
    return progress;
  }

  // Méthodes de calcul pour les quiz (simulées)
  getQuizPlayCount(quiz: Quiz): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 100) + 10;
  }

  getQuizAverageScore(quiz: Quiz): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 20) + 65;
  }

  getLastPlayedDateForQuiz(quiz: Quiz): string {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 10);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  }

  getQuizCorrectAnswerRate(quiz: Quiz): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 25) + 60;
  }

  getQuestionDifficulty(question: Question): string {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return this.difficulties[Math.floor(Math.random() * this.difficulties.length)];
  }

  getQuestionSuccessRate(question: Question): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 40) + 50;
  }

  getQuizTopPlayers(quiz: Quiz): TopPlayer[] {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    const topPlayers: TopPlayer[] = [];
    const playerCount = Math.min(5, this.profiles.length);
    
    const shuffledProfiles = [...this.profiles].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < playerCount; i++) {
      const profile = shuffledProfiles[i];
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      
      topPlayers.push({
        name: profile.name,
        lastName: profile.lastName,
        score: Math.floor(Math.random() * 15) + 80,
        date: date.toLocaleDateString(),
        time: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
      });
    }
    
    // Trier par score décroissant
    return topPlayers.sort((a, b) => b.score - a.score);
  }
}