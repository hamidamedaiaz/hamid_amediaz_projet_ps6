import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import { ProfileStatsService } from 'src/services/profile-stats.service';
import { Profile } from 'src/models/profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats-accueilli',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-accueilli.component.html',
  styleUrl: './stats-accueilli.component.scss'
})
export class StatsAccueilliComponent implements OnInit, OnDestroy {
  profiles: Profile[] = [];
  selectedProfile: Profile | null = null;
  readonly ITEMS_PER_PAGE = 5;
  currentPage = 1;
  searchQuery = '';
  sortBy = 'name';
 
  private subscriptions: Subscription[] = [];

  constructor(
    private profileService: ProfileService,
    private profileStatsService: ProfileStatsService,
    private router: Router
  ) {}

  ngOnInit() {
    const profileSub = this.profileService.profiles$.subscribe(profiles => {
      this.profiles = profiles;
      console.log('Profils chargés:', this.profiles.length);
    });
    this.subscriptions.push(profileSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

          const countA = this.profileStatsService.getProfileStats(a.id).quizCount;
          const countB = this.profileStatsService.getProfileStats(b.id).quizCount;
          return countB - countA;

        case 'score':
          const scoreA = this.profileStatsService.getProfileStats(a.id).averageScore;
          const scoreB = this.profileStatsService.getProfileStats(b.id).averageScore;
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
    return this.profileStatsService.getProfileStats(profile.id).quizCount;
  }

  getBestScore(profile: Profile): number {
    return this.profileStatsService.getProfileStats(profile.id).bestScore;
  }

  getAverageScore(profile: Profile): number {
    return this.profileStatsService.getProfileStats(profile.id).averageScore;
  }

  getLastPlayedDate(profile: Profile): string {
    return this.profileStatsService.getProfileStats(profile.id).lastPlayedDate;
  }
}