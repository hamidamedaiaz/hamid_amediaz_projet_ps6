import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/models/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss',
  standalone: true,
})
export class ProfileItemComponent {

  @Input()
  profile: Profile | undefined;

  @Output()
  profileSelected: EventEmitter<Profile> = new EventEmitter<Profile>();

  constructor() { }

  ngOnInit() {

  }

  selectProfile() {
    if (this.profile) this.profileSelected.emit(this.profile);
  }

}
