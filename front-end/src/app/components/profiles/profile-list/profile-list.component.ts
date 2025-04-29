import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Profile } from 'src/models/profile.model';
import { ProfileService } from 'src/services/profile.service';
import { ProfileItemComponent } from '../profile-item/profile-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
  standalone: true,
  imports: [
    ProfileItemComponent,
    CommonModule,
    FormsModule
  ],
})

export class ProfileListComponent {
  public profileList: Profile[] = [];
  public isProfileListActivated: Boolean = false;
  public currentPage: String = this.currentPageService.getCurrentPage();

  @Output()
  profileSelected: EventEmitter<Profile> = new EventEmitter<Profile>();

  public searchQuery: String = '';

  @Input()
  public context: string = '';


  public showProfileForm: boolean = false;
  public isEditing: boolean = false;
  public currentProfile: Profile = {
    id: 0,
    name: '',
    lastName: '',
    role: 'user',
    HINT_TIME_OUT_DURATION: 5000
  };
  public showDeleteConfirm: boolean = false;
  public profileToDelete: Profile | null = null;

  constructor(
    public profileService: ProfileService,
    private router: Router,
    private currentProfileService: CurrentProfileService,
    private cdr: ChangeDetectorRef,
    private currentPageService: CurrentPageService
  ) {
    this.profileService.profiles$.subscribe((profiles) => {
      this.profileList = profiles;
      console.log("Liste de profils mise à jour:", this.profileList.length, "profils");
    });
  }

  filteredProfiles() {
    return this.profileList.filter(profile => 
      profile.name.toLowerCase().concat(' ').concat(profile.lastName.toLowerCase()).includes(this.searchQuery.toLowerCase())
    );
  }

  ngOnInit() {
    console.log("ProfileListComponent initialisé avec contexte:", this.context);
  }

  profileSelectedHandler(profile: Profile) {
    console.log("Profil sélectionné dans contexte:", this.context, profile.name);

    setTimeout(() => {
      if (this.context === 'home') {
        this.currentProfileService.setCurrentProfile(profile);
      } else if (this.context === 'admin') {

        this.profileSelected.emit(profile);
        console.log("Événement profileSelected émis pour:", profile.name);
      } else {

        this.profileSelected.emit(profile);
        console.log("Événement profileSelected émis pour:", profile.name);
      }
      this.cdr.detectChanges();
    }, 0);
  }

  public showProfileList() {
    this.isProfileListActivated = !this.isProfileListActivated;
  }

  public removeProfile(profileToRemove: Profile) {
    this.profileList = this.profileList.filter(profile => profile != profileToRemove);
  }


  public createProfile() {
    this.isEditing = false;
    this.currentProfile = {
      id: Date.now(),
      name: '',
      lastName: '',
      role: 'user',
      HINT_TIME_OUT_DURATION: 5000
    };
    this.showProfileForm = true;
  }

  public editProfile(profile: Profile) {
    this.isEditing = true;
    this.currentProfile = { ...profile };
    this.showProfileForm = true;
  }

  public deleteProfile(profile: Profile) {
    this.profileToDelete = profile;
    this.showDeleteConfirm = true;
  }

  public confirmDelete() {
    if (this.profileToDelete) {
      this.profileService.deleteProfile(this.profileToDelete.id);
      this.showDeleteConfirm = false;
      this.profileToDelete = null;
    }
  }

  public cancelDelete() {
    this.showDeleteConfirm = false;
    this.profileToDelete = null;
  }

  public saveProfile() {
    if (this.isEditing) {
      this.profileService.updateProfile(this.currentProfile);
    } else {
      this.profileService.createProfile(this.currentProfile.name, this.currentProfile.lastName);
    }
    this.cancelProfileForm();
  }

  public cancelProfileForm() {
    this.showProfileForm = false;
    this.currentProfile = {
      id: 0,
      name: '',
      lastName: '',
      role: 'user',
      HINT_TIME_OUT_DURATION: 5000
    };
  }
}