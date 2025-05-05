import { Component } from '@angular/core';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: 'app-gamemode-selection-page',
  templateUrl: './gamemode-selection-page.component.html',
  styleUrl: './gamemode-selection-page.component.scss'
})

export class GamemodeSelectionComponent {

  constructor(private currentPageService:CurrentPageService){
    this.currentPageService.setCurrentPage("gamemode-selection");
  }

}
