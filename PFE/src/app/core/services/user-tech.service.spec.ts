import { TestBed } from '@angular/core/testing';

import { UserTechService } from './user-tech.service';

describe('UserTechService', () => {
  let service: UserTechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
