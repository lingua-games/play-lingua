import { TestBed } from '@angular/core/testing';

import { InvitationService } from './invitation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InvitationService', () => {
  let service: InvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
