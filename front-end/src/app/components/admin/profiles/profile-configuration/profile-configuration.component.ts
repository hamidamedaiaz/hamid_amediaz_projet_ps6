import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Profile } from 'src/models/profile.model';
import {FormsModule} from "@angular/forms";
import { ProfileService } from 'src/services/profile.service';

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

  @Output()
  closeConfigPanel = new EventEmitter<void>();

  //Copie Simple et efficace pour des types simples
  public currentProfileCopy: Profile | null = null;

  constructor(private cdr: ChangeDetectorRef, private profileService:ProfileService) {
    this.profileService.profileToEdit$.subscribe((profile) => {
      this.currentProfileCopy = JSON.parse(JSON.stringify(profile));
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['profile'] && changes['profile'].currentValue) {
      console.log('Profile configuration changed to:', this.currentProfileCopy?.name);
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
    }
  }

  //resetEmptyProfile():void{ this.profileTemplate = JSON.parse(JSON.stringify("j")); }

  closeConfiguration() {
    console.log('Fermeture du panneau de configuration');
    this.closeConfigPanel.emit();
  }

  saveConfiguration() {
    this.profileService.updateProfile(this.currentProfileCopy!);
    this.closeConfiguration();
  }
}
