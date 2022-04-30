import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistProfileComponent } from './artist-profile.component';

describe('ArtistProfileComponent', () => {
  let component: ArtistProfileComponent;
  let fixture: ComponentFixture<ArtistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
