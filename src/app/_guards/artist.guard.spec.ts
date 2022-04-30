import { TestBed } from '@angular/core/testing';

import { ArtistGuard } from './artist.guard';

describe('ArtistGuard', () => {
  let guard: ArtistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ArtistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
