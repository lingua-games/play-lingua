import { Component, OnInit } from '@angular/core';
import { LanguageModel } from '../../../core/models/language.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BookChapterService } from '../../../core/service/book-chapter.service';
import { BookModel } from '../../../core/models/book.model';

@Component({
  selector: 'app-add-word-by-user',
  templateUrl: './add-word-by-user.component.html',
  styleUrls: ['./add-word-by-user.component.scss'],
})
export class AddWordByUserComponent implements OnInit {
  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];
  visibleBooks: BookModel[] = [];
  allBooks: BookModel[] = [];
  isLoading: boolean;

  selectLanguageForm = this.formBuilder.group({
    baseLanguage: [{ value: '' }, Validators.required],
    targetLanguage: ['', Validators.required],
    isSelectedLanguageSubmit: [false],
  });

  get baseLanguage(): AbstractControl {
    return this.selectLanguageForm.get('baseLanguage');
  }

  get targetLanguage(): AbstractControl {
    return this.selectLanguageForm.get('targetLanguage');
  }

  get isSelectedLanguageSubmit(): AbstractControl {
    return this.selectLanguageForm.get('isSelectedLanguageSubmit');
  }

  selectBookForm = this.formBuilder.group({
    book: [''],
    selectBookRandom: ['book'],
  });

  get selectBookRandom(): AbstractControl {
    return this.selectBookForm.get('selectBookRandom');
  }

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private bookChapterService: BookChapterService
  ) {}

  ngOnInit(): void {
    this.getBaseAndTargetLanguages();
    this.getBooks();

    this.isSelectedLanguageSubmit.valueChanges.subscribe((value) => {
      if (value) {
        this.baseLanguage.disable();
        this.targetLanguage.disable();
      } else {
        this.baseLanguage.enable();
        this.targetLanguage.enable();
      }
    });
  }

  bookSelectionChange(event): void {
    if (event.value.id === 0) {
      // TODO OPEN ADD BOOK DIALOG
    }
  }

  getBooks(): void {
    this.isLoading = true;
    this.allBooks = [];
    this.allBooks.push({
      TargetLanguageId: 0,
      name: 'Add new book',
      id: 0,
    });
    this.bookChapterService.getBooksByLanguages([1, 2, 3]).subscribe(
      (res: BookModel[]) => {
        if (res && res.length) {
          res.forEach((element) => {
            this.allBooks.push(element);
          });
        }

        this.isLoading = false;
      },
      (error: string) => {
        this.isLoading = false;
      }
    );
  }

  getBaseAndTargetLanguages(): void {
    const selectedLanguages = JSON.parse(
      localStorage.getItem('lingua-selected-languages')
    );
    this.baseLanguages = selectedLanguages.base;
    this.targetLanguages = selectedLanguages.target;
  }

  submitSelectedLanguages(): void {
    if (this.isSelectedLanguageSubmit.value) {
      this.isSelectedLanguageSubmit.setValue(false);
      return;
    }
    if (this.selectLanguageForm.invalid) {
      this.selectLanguageForm.markAsDirty();
      if (this.baseLanguage.invalid) {
        this.notificationService.showMessage(
          'Base language has not selected yet',
          Severity.error,
          '',
          'bc'
        );
      }

      if (this.targetLanguage.invalid) {
        this.notificationService.showMessage(
          'Target language has not selected yet',
          Severity.error,
          '',
          'bc'
        );
      }
      return;
    }
    this.isSelectedLanguageSubmit.setValue(true);
    this.visibleBooks = this.allBooks.filter(
      (x: BookModel) =>
        x.TargetLanguageId === this.baseLanguage.value.id || x.id === 0
    );
  }

  checkFormValidation(fieldName: string): string {
    // if (
    //   this.formValidation.find((x: ValidationModel) => x.field === fieldName)
    // ) {
    //   return 'field-not-valid';
    // }
    return '';
  }
}
