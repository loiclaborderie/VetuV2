import { TestBed } from '@angular/core/testing';

import { alreadyAuthGuard } from './alreadyauth.guard';

describe('AuthGuard', () => {
  let guard: alreadyAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(alreadyAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
