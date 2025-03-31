import { Component,Input } from '@angular/core';
import { Router, RouterLink} from "@angular/router";
import { ProfileSearchbarComponent } from 'src/app/components/profiles/profile-searchbar/profile-searchbar.component';
import { ProfileListComponent } from 'src/app/components/profiles/profile-list/profile-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ProfileSearchbarComponent,
    ProfileListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(private router: Router){}
  
  @Input()
  public context: string = "home";

  selectGamemode(){
    console.log("gamemode");
    this.router.navigate(['/gamemode-selection'])
  }
  

}
