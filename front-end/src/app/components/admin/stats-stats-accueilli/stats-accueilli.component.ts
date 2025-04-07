import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  responseTime: number;
}

@Component({
  selector: 'app-stats-accueilli',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-accueilli.component.html',
  styleUrl: './stats-accueilli.component.scss'
})
export class StatsAccueilliComponent implements OnInit {
  profiles: Profile[] = [];
  quizzes: Quiz[] = [];
  selectedProfile: Profile | null = null;
  readonly ITEMS_PER_PAGE = 5;
  currentPage = 1;
  searchQuery = '';
  sortBy = 'name';
  private readonly months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  constructor(
    private profileService: ProfileService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.profiles$.subscribe(profiles => {
      this.profiles = profiles;
      console.log('Profils chargés:', this.profiles.length);
    });


    this.quizService.quizzes$.subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  // Méthode modifiée pour rediriger vers la page détaillée des statistiques
  viewProfileDetails(profile: Profile) {
    console.log('Navigation vers les statistiques détaillées de l\'accueilli:', profile.name, profile.lastName);
    this.router.navigate(['/player-stats', profile.id]);
  }

  closeProfileDetails() {
    this.selectedProfile = null;
  }

  filteredProfiles() {
    let filtered = [...this.profiles];
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(query) || 
        profile.lastName.toLowerCase().includes(query)
      );
    }
    
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

  getInitials(profile: Profile): string {
    return (profile.name.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
  }

  getQuizCountForProfile(profile: Profile): number {
    return Math.floor(Math.random() * 20) + 1;
  }

  getBestScore(profile: Profile): number {
    return Math.floor(Math.random() * 30) + 70;
  }

  getAverageScore(profile: Profile): number {
    return Math.floor(Math.random() * 20) + 60;
  }

  getLastPlayedDate(profile: Profile): string {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  }

  getProfileGameHistory(profile: Profile): GameHistory[] {
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
    
    return history.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }

  getProfileProgress(profile: Profile): MonthProgress[] {
    const progress: MonthProgress[] = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      progress.push({
        month: this.months[monthIndex],
        score: Math.floor(Math.random() * 30) + 60,
        responseTime: Math.floor(Math.random() * 12) + 3 
      });
    }
    
    return progress;
  }

  getTimeHeight(responseTime: number): number {
   
    const minTime = 3;  
    const maxTime = 15; 
    
    
    return Math.max(0, Math.min(100, (1 - (responseTime - minTime) / (maxTime - minTime)) * 100));
  }
}