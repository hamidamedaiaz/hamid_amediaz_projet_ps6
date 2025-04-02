import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/models/profile.model';

@Component({
  selector: 'app-profile-configuration',
  standalone: true,
  imports: [],
  templateUrl: './profile-configuration.component.html',
  styleUrl: './profile-configuration.component.scss'
})
export class ProfileConfigurationComponent {
  @Input()
  profile: Profile | undefined;

  @Output()
  closeConfigPanel = new EventEmitter<void>();

  getInitials(): string {
    if (!this.profile) return '';
    
    const firstName = this.profile.name.charAt(0).toUpperCase();
    const lastName = this.profile.lastName.charAt(0).toUpperCase();
    
    return firstName + lastName;
  }

  closeConfiguration() {
    this.closeConfigPanel.emit();
  }
  
  saveConfiguration() {
    console.log('Configuration sauvegardée pour:', this.profile?.name);
    this.closeConfiguration();
  }
}