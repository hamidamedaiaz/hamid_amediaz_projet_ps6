import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';

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
}