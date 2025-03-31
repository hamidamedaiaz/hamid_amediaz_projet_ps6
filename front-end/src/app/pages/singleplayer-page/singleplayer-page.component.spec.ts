import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleplayerPageComponent } from './singleplayer-page.component';

describe('SingleplayerPageComponent', () => {
  let component: SingleplayerPageComponent;
  let fixture: ComponentFixture<SingleplayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleplayerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleplayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
