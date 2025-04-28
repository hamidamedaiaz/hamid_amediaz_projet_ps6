import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Profile } from 'src/models/profile.model';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile-configuration',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './profile-configuration.component.html',
  styleUrl: './profile-configuration.component.scss'
})
export class ProfileConfigurationComponent implements OnChanges {
  @Input()
  profile: Profile | undefined;

  @Output()
  closeConfigPanel = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['profile'] && changes['profile'].currentValue) {
      console.log('Profile configuration changed to:', this.profile?.name);
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
    }
  }

  getInitials(): string {
    if (!this.profile) return '';

    const firstName = this.profile.name.charAt(0).toUpperCase();
    const lastName = this.profile.lastName.charAt(0).toUpperCase();

    return firstName + lastName;
  }

  closeConfiguration() {
    console.log('Fermeture du panneau de configuration');
    this.closeConfigPanel.emit();
  }

  saveConfiguration() {
    console.log('Configuration sauvegardée pour:', this.profile?.name);
    this.closeConfiguration();
  }
}
