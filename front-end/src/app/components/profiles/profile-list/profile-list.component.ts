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
      //this.cdr.detectChanges();
    });

  }

  filteredProfiles() {
    return this.profileList.filter(profile => profile.name.toLowerCase().concat(' ').concat(profile.lastName.toLowerCase()).includes(this.searchQuery.toLowerCase()));
  }

  ngOnInit() {
    console.log("ProfileListComponent initialisé avec contexte:", this.context);
  }

  profileSelectedHandler(profile: Profile) {
    console.log("Profil sélectionné dans contexte:", this.context, profile.name);

    setTimeout(() => {
      if (this.context === 'home') {
        this.currentProfileService.setCurrentProfile(profile);
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

  public removeProfile(profileToRemove:Profile){
    this.profileList =  this.profileList.filter(profile => profile != profileToRemove);
  }

  public createProfile(){
    this.profileSelected.next({
      id:999,
      name:'',
      lastName:'',
      role:'user',
      HINT_TIME_OUT_DURATION:5000
    })
  }
}
