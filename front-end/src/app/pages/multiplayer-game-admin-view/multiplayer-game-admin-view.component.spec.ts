import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerGameAdminViewComponent } from './multiplayer-game-admin-view.component';

describe('MultiplayerGameAdminViewComponent', () => {
  let component: MultiplayerGameAdminViewComponent;
  let fixture: ComponentFixture<MultiplayerGameAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplayerGameAdminViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiplayerGameAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
