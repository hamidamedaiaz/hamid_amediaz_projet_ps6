import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchbarComponent } from './profile-searchbar.component';

describe('ProfileSearchbarComponent', () => {
  let component: ProfileSearchbarComponent;
  let fixture: ComponentFixture<ProfileSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSearchbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
