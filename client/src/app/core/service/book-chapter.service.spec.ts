import { TestBed } from '@angular/core/testing';

import { BookChapterService } from './book-chapter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookChapterService', () => {
  let service: BookChapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookChapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
