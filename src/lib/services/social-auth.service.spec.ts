import { TestBed, inject } from '@angular/core/testing';

import { SocialAuthService } from './social-auth.service';

describe('SocialAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialAuthService]
    });
  });

  it('should ...', inject([SocialAuthService], (service: SocialAuthService) => {
    expect(service).toBeTruthy();
  }));
});
