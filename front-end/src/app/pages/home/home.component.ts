import { Component,Input } from '@angular/core';
import { Router, RouterLink} from "@angular/router";
import { ProfileListComponent } from 'src/app/components/admin/profiles/profile-list/profile-list.component';
import { CurrentPageService } from 'src/services/currentPage.service';
import { NgIf, NgClass } from '@angular/common';import {FormsModule} from "@angular/forms";
import { CurrentProfileService } from 'src/services/currentProfile.service';
import {last} from "rxjs";

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

  constructor(private router: Router, private currentPageService:CurrentPageService, private currentProfileService: CurrentProfileService){
    this.currentPageService.setCurrentPage("home");
  }


  @Input()
  public context: string = "home";

  public hide_admin_log : boolean = true;
  public codeError: boolean = false;
  public CORRECT_CODE : string = "1234";
  code: string[] = ['', '', '', ''];
  private autoCloseTimeoutId: any = null;


  selectGamemode(){
    console.log("gamemode");
    this.currentPageService.setCurrentPage("gamemode-selection")
    this.router.navigate(['/gamemode-selection'])
  }

  goToAdminPage(){
    this.hide_admin_log = false;

    // Si un timer précédent existe, on l’annule
    if (this.autoCloseTimeoutId) {
      clearTimeout(this.autoCloseTimeoutId);
    }

    this.autoCloseTimeoutId = setTimeout(() => {
      this.hide_admin_log = true;
      this.code = ['', '', '', ''];
      this.codeError = false;
      this.autoCloseTimeoutId = null; // Réinitialise l’ID
    }, 10000);
    //this.currentPageService.setCurrentPage("admin")
    //this.router.navigate(['/admin']);
  }

  hideAdminLog(){
    this.hide_admin_log = true; // Cache la modale si on clique en dehors
    if (this.autoCloseTimeoutId) {
      clearTimeout(this.autoCloseTimeoutId);
      this.autoCloseTimeoutId = null;
    }
  }



  onInput(index: number, event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Autoriser uniquement les chiffres
    if (!/^\d$/.test(value)) {
      input.value = '';
      this.code[index] = '';
      return;
    }

    this.code[index] = value;

    // Aller au champ suivant si un chiffre est saisi
    if (index < 3) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Vérification si tous les chiffres sont remplis
    if (this.code.every(digit => digit !== '')) {
      const finalCode = this.code.join('');
      console.log("Code saisi :", finalCode);
      if (finalCode === this.CORRECT_CODE) {
        this.currentPageService.setCurrentPage("admin");
        this.currentProfileService.setAdmin();
        this.router.navigate(['/admin']);
      }
      else{
        this.codeError = true;
        this.code = ['', '', '', ''];
        // Vider les champs visibles normalement le this.Code = ... marche mais l'affichage bug ça va trop vite
        const inputs = document.querySelectorAll('.code-inputs input') as NodeListOf<HTMLInputElement>;
        inputs.forEach(input => input.value = '');
        inputs[0].focus();
      }
    }
  }



  keyPressed(i : number, event: KeyboardEvent) {
    console.log("keyPressed"  + event.key);
    const inputs = document.querySelectorAll('.code-inputs input') as NodeListOf<HTMLInputElement>;

    if (event.key === 'Backspace') {
      this.code[i] = '';
      if(i > 0){
        inputs[i-1].focus();
      }
      event.preventDefault();
    }
  }
}
