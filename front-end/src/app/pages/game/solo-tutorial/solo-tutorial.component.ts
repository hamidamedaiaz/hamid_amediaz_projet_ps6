import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-solo-tutorial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solo-tutorial.component.html',
  styleUrl: './solo-tutorial.component.scss'
})
export class SoloTutorialComponent {

  public currentStep: number = 1;
  public totalSteps: number = 3;

  constructor(
    private router: Router,
    private currentPageService: CurrentPageService
  ) {
    this.currentPageService.setCurrentPage("solo-tutorial");
  }

  public startQuiz(): void {
    this.router.navigate(['/select-quiz']);
  }

  public goBack(): void {
    this.router.navigate(['/gamemode-selection']);
  }
}