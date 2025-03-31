import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleplayerGameComponent } from './singleplayer-game.component';

describe('SingleplayerGameComponent', () => {
  let component: SingleplayerGameComponent;
  let fixture: ComponentFixture<SingleplayerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleplayerGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleplayerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
