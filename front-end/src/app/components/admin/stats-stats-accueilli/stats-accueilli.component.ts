import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';

interface GameHistory {
  id: number;
  date: string;
  quizTitle: string;
  score: number;
  time: string;
  hintsUsed: number;
  totalHints: number;
  avgResponseTime: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  questions: QuestionDetails[];
}

interface QuestionDetails {
  id: number;
  text: string;
  isCorrect: boolean;
  responseTime: number;
  hintsUsed: number;
  availableHints: number;
  attempts: number;
  selectedAnswer: string;
  correctAnswer: string;
}

interface MonthProgress {
  month: string;
  value: number;
}

@Component({
  selector: 'app-stats-accueilli',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-accueilli.component.html',
  styleUrl: './stats-accueilli.component.scss'
})
export class StatsAccueilliComponent implements OnInit {
  // Listes de données
  profiles: Profile[] = [];
  quizzes: Quiz[] = [];

  // Élément sélectionné pour le modal
  selectedProfile: Profile | null = null;
  selectedGame: GameHistory | null = null;
  activeTab: 'score' | 'hints' | 'time' | 'accuracy' = 'score';

  // Pagination
  readonly ITEMS_PER_PAGE = 5;
  currentPage = 1;

  // Recherche et tri
  searchQuery = '';
  sortBy = 'name';

  // Pour simulation des données
  private readonly months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  constructor(
    private profileService: ProfileService,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    // Charger les profils
    this.profileService.profiles$.subscribe(profiles => {
      this.profiles = profiles;
      console.log('Profils chargés:', this.profiles.length);
    });

    // Charger les quiz pour les références
    this.quizService.quiz$.subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  // Méthodes pour les profils
  viewProfileDetails(profile: Profile) {
    this.selectedProfile = profile;
    console.log('Détails du profil ouverts pour:', profile.name, profile.lastName);
  }

  closeProfileDetails() {
    this.selectedProfile = null;
  }

  closeGameDetails() {
    this.selectedGame = null;
  }

  viewGameDetails(game: GameHistory) {
    this.selectedGame = game;
    console.log('Détails de la session ouverts pour:', game.quizTitle, game.date);
  }

  setActiveTab(tab: 'score' | 'hints' | 'time' | 'accuracy') {
    this.activeTab = tab;
  }

  // Méthodes de filtrage et pagination
  filteredProfiles() {
    let filtered = [...this.profiles];
    
    // Appliquer le filtre de recherche
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(query) || 
        profile.lastName.toLowerCase().includes(query)
      );
    }
    
    // Appliquer le tri
    filtered.sort((a, b) => {
      switch (this.sortBy) {
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
    const startIndex = (this.currentPage - 1) * this.ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + this.ITEMS_PER_PAGE);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number {
    let filteredProfiles = [...this.profiles];
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.name.toLowerCase().includes(query) || 
        profile.lastName.toLowerCase().includes(query)
      );
    }
    
    return Math.ceil(filteredProfiles.length / this.ITEMS_PER_PAGE);
  }

  // Méthodes utilitaires
  getInitials(profile: Profile): string {
    return (profile.name.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
  }

  // Méthodes de calcul pour les profils (simulées)
  getQuizCountForProfile(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 20) + 1;
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

  // Nouvelles méthodes pour les métriques thérapeutiques
  getAverageHintsUsed(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return parseFloat((Math.random() * 3 + 1).toFixed(1));
  }

  getAverageResponseTime(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return parseFloat((Math.random() * 10 + 5).toFixed(1));
  }

  getCorrectAnswersPercentage(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    return Math.floor(Math.random() * 25 + 65);
  }

  getIncorrectAnswersPercentage(profile: Profile): number {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    const correctPercentage = this.getCorrectAnswersPercentage(profile);
    return 100 - correctPercentage;
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
      
      const totalQuestions = Math.floor(Math.random() * 5) + 5;
      const correctAnswers = Math.floor(Math.random() * (totalQuestions - 1)) + 1;
      const incorrectAnswers = totalQuestions - correctAnswers;
      const totalHints = totalQuestions * 3;
      const hintsUsed = Math.floor(Math.random() * totalHints);
      
      const questions: QuestionDetails[] = [];
      for (let j = 0; j < totalQuestions; j++) {
        const isCorrect = j < correctAnswers;
        questions.push({
          id: j + 1,
          text: `Question ${j + 1} : Quelle est la titre de cette chanson ?`,
          isCorrect: isCorrect,
          responseTime: parseFloat((Math.random() * 20 + 5).toFixed(1)),
          hintsUsed: Math.floor(Math.random() * 4),
          availableHints: 3,
          attempts: Math.floor(Math.random() * 3) + 1,
          selectedAnswer: isCorrect ? 'Billie Jean (Michael Jackson)' : 'Bad (Michael Jackson)',
          correctAnswer: 'Billie Jean (Michael Jackson)'
        });
      }
      
      history.push({
        id: i + 1,
        date: date.toLocaleDateString(),
        quizTitle: quizTitle,
        score: Math.floor((correctAnswers / totalQuestions) * 100),
        time: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        hintsUsed: hintsUsed,
        totalHints: totalHints,
        avgResponseTime: parseFloat((Math.random() * 10 + 5).toFixed(1)),
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers,
        totalQuestions: totalQuestions,
        questions: questions
      });
    }
    
    // Trier par date décroissante
    return history.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }

  getProfileProgress(profile: Profile, metric: 'score' | 'hints' | 'time' | 'accuracy'): MonthProgress[] {
    // Fonction de simulation de données - À remplacer par une fonction réelle
    const progress: MonthProgress[] = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      let value: number;
      
      switch (metric) {
        case 'score':
          value = Math.floor(Math.random() * 30) + 60;
          break;
        case 'hints':
          value = parseFloat((Math.random() * 3 + 1).toFixed(1));
          break;
        case 'time':
          value = parseFloat((Math.random() * 10 + 5).toFixed(1));
          break;
        case 'accuracy':
          value = Math.floor(Math.random() * 25 + 65);
          break;
      }
      
      progress.push({
        month: this.months[monthIndex],
        value: value
      });
    }
    
    return progress;
  }
  
  // Utilitaire pour convertir des valeurs en pourcentages pour les graphiques
  getPercentageValue(value: number, maxValue: number): number {
    return (value / maxValue) * 100;
  }
  
  // Génération de recommandations basées sur les performances
  getRecommendations(game: GameHistory): string[] {
    const recommendations: string[] = [];
    
    // Basées sur le score
    if (game.score < 60) {
      recommendations.push('Proposer des quiz avec moins de questions ou des niveaux de difficulté progressifs.');
    }
    
    // Basées sur l'utilisation des indices
    if (game.hintsUsed / game.totalHints > 0.7) {
      recommendations.push('L\'utilisateur semble avoir besoin de beaucoup d\'indices. Envisager d\'ajouter plus d\'indices ou de les rendre plus explicites.');
    } else if (game.hintsUsed / game.totalHints < 0.2 && game.score > 80) {
      recommendations.push('L\'utilisateur réussit bien sans utiliser beaucoup d\'indices. Envisager d\'augmenter la difficulté ou de réduire le nombre d\'indices.');
    }
    
    // Basées sur le temps de réponse
    if (game.avgResponseTime > 15) {
      recommendations.push('Temps de réponse assez long. Envisager des exercices pour améliorer la reconnaissance rapide ou simplifier les options de réponse.');
    } else if (game.avgResponseTime < 5 && game.score < 70) {
      recommendations.push('L\'utilisateur répond rapidement mais fait des erreurs. Encourager à prendre plus de temps pour réfléchir avant de répondre.');
    }
    
    // Si peu de recommandations, ajouter une générique
    if (recommendations.length < 2) {
      recommendations.push('Continuer avec des quiz similaires pour consolider les connaissances musicales.');
    }
    
    return recommendations;
  }
}