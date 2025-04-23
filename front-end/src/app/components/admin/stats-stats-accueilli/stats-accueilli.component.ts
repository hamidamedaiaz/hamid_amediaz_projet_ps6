import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-stats-accueilli',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-accueilli.component.html',
  styleUrl: './stats-accueilli.component.scss'
})
export class StatsAccueilliComponent implements OnInit, AfterViewInit {
  profiles: Profile[] = [];
  quizzes: Quiz[] = [];
  selectedProfile: Profile | null = null;
  readonly ITEMS_PER_PAGE = 5;
  currentPage = 1;
  searchQuery = '';
  sortBy = 'name';

 
  private calculatedStats: {[key: number]: any} = {};

  constructor(
    private profileService: ProfileService,
    private quizService: QuizService,
    private router: Router,
    private cdr: ChangeDetectorRef 
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.profiles.forEach(profile => {
        this.calculatedStats[profile.id] = {
          quizCount: this.getQuizCountForProfile(profile),
          bestScore: this.getBestScore(profile),
          averageScore: this.getAverageScore(profile),
          lastPlayedDate: this.getLastPlayedDate(profile)
        };
      });

      this.cdr.detectChanges();
    }, 0);
  }

  viewProfileDetails(profile: Profile) {
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
          const countA = this.calculatedStats[a.id]?.quizCount || this.getQuizCountForProfile(a);
          const countB = this.calculatedStats[b.id]?.quizCount || this.getQuizCountForProfile(b);
          return countB - countA;
        case 'score':
          const scoreA = this.calculatedStats[a.id]?.averageScore || this.getAverageScore(a);
          const scoreB = this.calculatedStats[b.id]?.averageScore || this.getAverageScore(b);
          return scoreB - scoreA;
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
    if (this.calculatedStats[profile.id]?.quizCount !== undefined) {
      return this.calculatedStats[profile.id].quizCount;
    }
    return Math.floor(Math.random() * 20) + 1;
  }

  getBestScore(profile: Profile): number {
    if (this.calculatedStats[profile.id]?.bestScore !== undefined) {
      return this.calculatedStats[profile.id].bestScore;
    }
    return Math.floor(Math.random() * 30) + 70;
  }

  getAverageScore(profile: Profile): number {
    if (this.calculatedStats[profile.id]?.averageScore !== undefined) {
      return this.calculatedStats[profile.id].averageScore;
    }
    return Math.floor(Math.random() * 20) + 60;
  }

  getLastPlayedDate(profile: Profile): string {
    if (this.calculatedStats[profile.id]?.lastPlayedDate !== undefined) {
      return this.calculatedStats[profile.id].lastPlayedDate;
    }
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  }

}