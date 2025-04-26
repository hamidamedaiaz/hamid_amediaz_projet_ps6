import { Component,Input } from '@angular/core';
import { Router, RouterLink} from "@angular/router";
import { ProfileListComponent } from 'src/app/components/profiles/profile-list/profile-list.component';
import { CurrentPageService } from 'src/services/currentPage.service';
import { NgIf, NgClass } from '@angular/common';import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ProfileListComponent,
        NgClass,
        NgIf
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(private router: Router, private currentPageService:CurrentPageService){
    this.currentPageService.setCurrentPage("home");
  }


  @Input()
  public context: string = "home";

  public hide_admin_log : boolean = true;
  public CORRECT_CODE : string = "1234";

  selectGamemode(){
    console.log("gamemode");
    this.currentPageService.setCurrentPage("gamemode-selection")
    this.router.navigate(['/gamemode-selection'])
  }

  goToAdminPage(){
    this.hide_admin_log = false;
    console.log("zizi");
    //this.currentPageService.setCurrentPage("admin")
    //this.router.navigate(['/admin']);
  }

  hideAdminLog(){
    this.hide_admin_log = true; // Cache la modale si on clique en dehors
  }

  code: string[] = ['', '', '', ''];

  onInput(index: number, event: any) {
    const input = event.target;
    const value = input.value;

    // Autoriser que les chiffres
    if (!/^\d$/.test(value)) {
      this.code[index] = '';
      return;
    }

    // Passer au champ suivant si un chiffre est saisi
    if (value && index < 3) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Si tous les chiffres sont remplis
    if (this.code.every(digit => digit !== '')) {
      const finalCode = this.code.join('');
      console.log("Code saisi :", finalCode);
      if(finalCode === this.CORRECT_CODE){
        this.currentPageService.setCurrentPage("admin")
        this.router.navigate(['/admin']);
      }
    }
  }

}
