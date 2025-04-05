import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import { Profile } from 'src/models/profile.model';

@Component({
  selector: 'app-player-stats-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-stats-details.component.html',
  styleUrl: './player-stats-details.component.scss'
})
export class PlayerStatsDetailsComponent implements OnInit {
  profile: Profile | null = null;
  activeTab: 'score' | 'hints' | 'time' | 'accuracy' = 'score';
  
  // Données statistiques de base pour chaque onglet - à remplacer par des données réelles
  scoreData = [
    { month: 'Nov', value: 72 },
    { month: 'Déc', value: 78 },
    { month: 'Jan', value: 80 },
    { month: 'Fév', value: 71 },
    { month: 'Mar', value: 79 },
    { month: 'Avr', value: 68 }
  ];
  
  hintsData = [
    { month: 'Nov', value: 3.2 },
    { month: 'Déc', value: 2.8 },
    { month: 'Jan', value: 2.5 },
    { month: 'Fév', value: 2.9 },
    { month: 'Mar', value: 2.2 },
    { month: 'Avr', value: 2.0 }
  ];
  
  timeData = [
    { month: 'Nov', value: 12.5 },
    { month: 'Déc', value: 11.2 },
    { month: 'Jan', value: 10.8 },
    { month: 'Fév', value: 11.6 },
    { month: 'Mar', value: 9.5 },
    { month: 'Avr', value: 8.7 }
  ];
  
  accuracyData = [
    { month: 'Nov', value: 65 },
    { month: 'Déc', value: 70 },
    { month: 'Jan', value: 75 },
    { month: 'Fév', value: 68 },
    { month: 'Mar', value: 72 },
    { month: 'Avr', value: 78 }
  ];

  // Métriques thérapeutiques générales
  totalGames: number = 17;
  successRate: number = 65;
  avgResponseTime: number = 7.8;
  precision: number = 50;
  
  // Métriques thérapeutiques spécifiques demandées
  totalHintsUsed: number = 42;        // Nombre total d'indices utilisés
  avgHintsUsed: number = 2.5;         // Moyenne d'indices utilisés par partie
  avgTimeBetweenAnswers: number = 8.3; // Temps moyen entre les réponses (en secondes)
  totalCorrectAnswers: number = 75;    // Nombre de bonnes réponses sélectionnées
  totalIncorrectAnswers: number = 25;  // Nombre de mauvaises réponses sélectionnées
  correctAnswersPercent: number = 75;  // Pourcentage de bonnes réponses
  incorrectAnswersPercent: number = 25; // Pourcentage de mauvaises réponses

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    // Récupérer l'ID du joueur à partir de l'URL
    this.route.params.subscribe(params => {
      const profileId = Number(params['id']);
      if (profileId) {
        this.loadProfile(profileId);
      } else {
        // Rediriger vers la page d'administration si l'ID n'est pas valide
        this.router.navigate(['/admin']);
      }
    });
  }

  loadProfile(profileId: number) {
    this.profileService.profiles$.subscribe(profiles => {
      this.profile = profiles.find(p => p.id === profileId) || null;
      if (!this.profile) {
        // Rediriger si le profil n'est pas trouvé
        this.router.navigate(['/admin']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

  setActiveTab(tab: 'score' | 'hints' | 'time' | 'accuracy') {
    this.activeTab = tab;
  }

  // Retourne les données appropriées selon l'onglet actif
  getCurrentData() {
    switch (this.activeTab) {
      case 'score': return this.scoreData;
      case 'hints': return this.hintsData;
      case 'time': return this.timeData;
      case 'accuracy': return this.accuracyData;
      default: return this.scoreData;
    }
  }

  // Adapte les valeurs pour l'affichage dans le graphique
  getHeightPercentage(value: number): number {
    switch (this.activeTab) {
      case 'score': 
      case 'accuracy': 
        return value; // Déjà en pourcentage
      case 'hints':
        return (value / 5) * 100; // Supposant un maximum de 5 indices
      case 'time':
        return (value / 15) * 100; // Supposant un maximum de 15 secondes
      default:
        return value;
    }
  }

  // Utilitaire pour formatter l'affichage des valeurs
  getValueDisplay(value: number): string {
    switch (this.activeTab) {
      case 'score': 
      case 'accuracy': 
        return value + '%';
      case 'hints':
        return value.toString();
      case 'time':
        return value + 's';
      default:
        return value.toString();
    }
  }

  // Méthodes utilitaires
  getInitials(profile: Profile): string {
    return (profile.name.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
  }
}