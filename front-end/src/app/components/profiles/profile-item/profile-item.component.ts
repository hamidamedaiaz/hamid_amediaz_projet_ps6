import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Profile } from 'src/models/profile.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class ProfileItemComponent {

  @Input()
  profile: Profile | undefined;

  @Input()
  context: string = '';

  @Output()
  profileSelected: EventEmitter<Profile> = new EventEmitter<Profile>();

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('ProfileItemComponent initialisé avec contexte:', this.context);
  }

  selectProfile() {
    if (this.profile) {
      console.log('Sélection du profil:', this.profile.name, 'dans contexte:', this.context);
      
      this.profileSelected.emit(this.profile);
      console.log('Événement émis pour:', this.profile.name);
      
      this.cdr.detectChanges();
      
      if (this.context === 'home') {
        setTimeout(() => {
          this.router.navigate(['/gamemode-selection']);
        }, 100);
      }
    }
  }
}