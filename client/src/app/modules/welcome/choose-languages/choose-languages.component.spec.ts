import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLanguagesComponent } from './choose-languages.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('ChooseLanguagesComponent', () => {
  let component: ChooseLanguagesComponent;
  let fixture: ComponentFixture<ChooseLanguagesComponent>;
  let mockMessageService;
  beforeEach(async(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChooseLanguagesComponent],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
