import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'src/models/profile.model';
import {CurrentPageService} from "src/services/currentPage.service";



@Component({

  selector: 'app-player-stats-header',

  standalone: true,

  imports: [CommonModule],
  templateUrl: './player-stats-header.component.html',

  styleUrls: ['./player-stats-header.component.scss']

})


export class PlayerStatsHeaderComponent {


  @Input() profile: Profile | null = null;
  @Input() profileId: number = 0;

  constructor(private navigation : CurrentPageService){}

  navigateBack() {
    this.navigation.adminNav('selection-stat-acceuilli')
  }



  getInitials(profile: Profile | null): string {
    if (!profile) return '';

    const firstName = profile.name.charAt(0).toUpperCase();
    const lastName = profile.lastName.charAt(0).toUpperCase();

    return firstName + lastName;
  }


}
