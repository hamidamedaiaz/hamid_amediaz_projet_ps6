import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from 'src/services/profile.service';
import { QuizService } from 'src/services/quiz-list.service';
import { Profile } from 'src/models/profile.model';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
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
  }

  showQuizStats() {
    this.currentView = 'quiz';
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

  // Méthodes de calcul de statistiques
  getQuizCountForProfile(profile: Profile): number {
    // Mock - à remplacer par une logique réelle de suivi des quiz
    return Math.floor(Math.random() * 10);
  }

  getBestScore(profile: Profile): number {
    // Mock - à remplacer par une logique réelle de calcul des scores
    return Math.floor(Math.random() * 100);
  }

  getAverageScore(profile: Profile): number {
    // Mock - à remplacer par une logique réelle de calcul des scores
    return Math.floor(Math.random() * 80);
  }

  getQuizPlayCount(quiz: Quiz): number {
    // Mock - à remplacer par une logique réelle de suivi des parties
    return Math.floor(Math.random() * 50);
  }

  getQuizAverageScore(quiz: Quiz): number {
    // Mock - à remplacer par une logique réelle de calcul des scores
    return Math.floor(Math.random() * 90);
  }
}