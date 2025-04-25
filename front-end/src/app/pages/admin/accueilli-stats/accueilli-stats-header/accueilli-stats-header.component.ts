import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueilli-stats-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueilli-stats-header.component.html',
  styleUrls: ['./accueilli-stats-header.component.scss']
})
export class AccueilliStatsHeaderComponent {
  @Input() profileName: string = '';
  @Input() profileId: number = 0;
  
  @Output() backEvent = new EventEmitter<void>();
  
  navigateBack() {
    this.backEvent.emit();
  }
  
  getInitials(): string {
    if (!this.profileName) return '';
    
    const nameParts = this.profileName.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    }
    
    return this.profileName.charAt(0).toUpperCase();
  }
}