import { Component, Input, Output } from '@angular/core';
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

}
