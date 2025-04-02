import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from 'src/models/profile.model';
import { ProfileService } from 'src/services/profile.service';
import { ProfileItemComponent } from '../profile-item/profile-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileSearchbarComponent } from 'src/app/components/profiles/profile-searchbar/profile-searchbar.component';
import { CurrentProfileService } from 'src/services/currentProfile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
  standalone: true,
  imports: [ProfileItemComponent, CommonModule,
    ProfileSearchbarComponent, FormsModule],
})

export class ProfileListComponent {
  public profileList: Profile[] = [];
  private router: Router;
  
  @Output()
  profileSelected: EventEmitter<Profile> = new EventEmitter<Profile>();

  public searchQuery: String = '';

  private currentProfileService: CurrentProfileService;

  @Input()
  public context: any;

  constructor(public profileService: ProfileService, router: Router, currentProfileService: CurrentProfileService) {
    this.currentProfileService = currentProfileService;
    this.router = router;
    this.profileService.profiles$.subscribe((profiles) => {
      this.profileList = profiles;
      console.log("Profile list updated: ", this.profileList);
    });
  }

  filteredProfiles() {
    return this.profileList.filter(profile =>
      profile.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      profile.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  ngOnInit() {
    console.log("ProfileListComponent initialized");
  }

  profileSelectedHandler(profile: Profile) {
    if (this.context === 'home') {
      this.currentProfileService.setCurrentProfile(profile);
      this.router.navigate(['/gamemode-selection']);
    } else if (this.context === 'admin') {
      console.log("Profile selected from admin: ", profile.name);
      this.profileSelected.emit(profile);
    }
  }
}