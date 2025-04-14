import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StatsComponent } from "../../components/admin/stats/stats.component";
import { ProfileListComponent } from 'src/app/components/profiles/profile-list/profile-list.component';
import { QuizAppComponent } from "../../components/admin/quiz-app/quiz-app.component";
import { ProfileConfigurationComponent } from 'src/app/components/profiles/profile-configuration/profile-configuration.component';
import { QuizService } from "../../../services/quiz-list.service";
import { Quiz } from "../../../models/quiz.model";
import { QuizDetailsComponent } from "../../components/admin/quiz-details/quiz-details.component";
import { Profile } from 'src/models/profile.model';
import { StatsAccueilliComponent } from "../../components/admin/stats-stats-accueilli/stats-accueilli.component";
import { StatsQuizComponent } from "../../components/admin/stats-stats-quiz/stats-quiz.component";
import { CurrentPageService } from 'src/services/currentPage.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    StatsComponent,
    NgOptimizedImage,
    ProfileListComponent,
    QuizAppComponent,
    ProfileConfigurationComponent,
    QuizDetailsComponent,
    StatsAccueilliComponent,
    StatsQuizComponent
  ],

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  activeSection: string = 'home';
  activeQuiz: Quiz | null = null;
  selectedProfile: Profile | null = null;
  showStatsSubmenu: boolean = false;
  @Input()
  public context: string = "admin";

  constructor(
    private quizService: QuizService,
    private cdr: ChangeDetectorRef,private currentPageService: CurrentPageService
  ) {
    this.currentPageService.setCurrentPage("admin");
   }

  ngOnInit() {
    this.quizService.selectedEditQuiz$.subscribe((quiz) => {
      if (quiz !== null) {
        this.setSection('quiz-details');
        this.activeQuiz = quiz;
      }
    });
  }
  toggleStatsMenu() {
    this.showStatsSubmenu = !this.showStatsSubmenu;
  }

  setSection(section: string) {
    this.activeSection = section;
    console.log('admin - setSection() :', this.activeSection);
    if (section !== 'acceuilli') {
      this.selectedProfile = null;
    }
  }

  onProfileSelect(profile: Profile) {
    console.log('Profil sélectionné:', profile.name, profile.lastName);

    setTimeout(() => {
      this.selectedProfile = profile;
      this.cdr.detectChanges();
      console.log('Profil défini avec succès:', this.selectedProfile?.name);
    }, 0);
  }

  closeConfigPanel() {
    this.selectedProfile = null;
    this.cdr.detectChanges();
  }
}
