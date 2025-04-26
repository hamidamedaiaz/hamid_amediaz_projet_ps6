import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProgressData {
  month: string;
  score: number;
}

@Component({

  selector: 'app-player-stats-progression',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './player-stats-progression.component.html',
  styleUrls: ['./player-stats-progression.component.scss']
})

export class PlayerStatsProgressionComponent {

  @Input() monthlyPerformance: ProgressData[] = [];
  
  @Input() activeTab: 'score' | 'hints' | 'time' | 'accuracy' = 'score';
  
  @Output() tabChange = new EventEmitter<'score' | 'hints' | 'time' | 'accuracy'>();
  
  setActiveTab(tab: 'score' | 'hints' | 'time' | 'accuracy') {
    this.tabChange.emit(tab);
  }
  
  getTabLabel(tab: string): string {
    switch(tab) {
      case 'score': return 'Score global';
      case 'hints': return 'Utilisation des indices';
      case 'time': return 'Temps de réponse';
      case 'accuracy': return 'Précision';
      default: return '';
    }
  }
}