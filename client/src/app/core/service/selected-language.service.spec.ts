import { TestBed } from '@angular/core/testing';

import { SelectedLanguageService } from './selected-language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SelectedLanguageService', () => {
  let service: SelectedLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SelectedLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
