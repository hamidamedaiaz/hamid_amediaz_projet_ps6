import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';
import { Router } from '@angular/router';

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

  // Pagination
  readonly ITEMS_PER_PAGE = 5;
  currentPage = 1;

  // Recherche et tri
  searchQuery = '';
  sortBy = 'name';

  constructor(
    private profileService: ProfileService,
    private quizService: QuizService,
    private router: Router
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

  // Méthode modifiée pour rediriger vers la page de détails
  viewProfileDetails(profile: Profile) {
    console.log('Navigation vers les détails du profil:', profile.name, profile.lastName);
    this.router.navigate(['/player-stats-details', profile.id]);
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
}