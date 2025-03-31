import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-searchbar',
  templateUrl: './profile-searchbar.component.html',
  styleUrl: './profile-searchbar.component.scss',
  standalone: true,
  imports:[FormsModule]
})

export class ProfileSearchbarComponent {

  public searchQuery: string = '';

  @Output()
  searchInput: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
    console.log('ProfileSearchbarComponent initialized');
  }

  updateInput() {
    console.log('input update:', this.searchInput);
    this.searchInput.emit(this.searchQuery);
  }

}
