import { Component, ElementRef, OnInit } from '@angular/core';
import { LanguageModel } from '../../../core/models/language.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BookChapterService } from '../../../core/service/book-chapter.service';
import { BookModel } from '../../../core/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { ChapterModel } from '../../../core/models/chapter.model';
import { AddChapterDialogComponent } from '../add-chapter-dialog/add-chapter-dialog.component';
import { AddWordFormModel } from '../../../core/models/add-word-form.model';
import { WordToAddModel } from '../../../core/models/word-to-add.model';

@Component({
  selector: 'app-add-word-by-user',
  templateUrl: './add-word-by-user.component.html',
  styleUrls: ['./add-word-by-user.component.scss'],
})
export class AddWordByUserComponent implements OnInit {
  baseLanguages: LanguageModel[] = [];
  targetLanguages: LanguageModel[] = [];
  books: BookModel[] = [];
  chapters: ChapterModel[] = [];
  isBookLoading: boolean;
  formData: AddWordFormModel = new AddWordFormModel();

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
    book: ['', Validators.required],
    chapter: ['', Validators.required],
    selectBookRandom: ['book'],
  });

  get selectBookRandom(): AbstractControl {
    return this.selectBookForm.get('selectBookRandom');
  }

  get book(): AbstractControl {
    return this.selectBookForm.get('book');
  }

  get chapter(): AbstractControl {
    return this.selectBookForm.get('chapter');
  }

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private bookChapterService: BookChapterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getBaseAndTargetLanguages();

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
    if (event.value.id === -1) {
      this.dialog
        .open(AddBookDialogComponent, {
          width: '40%',
        })
        .afterClosed()
        .subscribe((res: any) => {
          if (res) {
            const itemToAdd = {
              id: 0,
              targetLanguageId: this.targetLanguage.value.id,
              name: res.bookName,
            };
            this.books = [...this.books, itemToAdd];
            this.book.setValue(itemToAdd);
          } else {
            this.book.setValue('');
          }
        });
    } else {
      this.chapters = [];
      this.bookChapterService
        .getChaptersByBookId(event.value.id)
        .subscribe((res: ChapterModel[]) => {
          this.chapters.push({
            id: -1,
            name: 'Add new chapter',
          });
          res.forEach((chapter) => {
            this.chapters.push(chapter);
          });
        });
    }
  }

  chapterSelectionChange(event): void {
    if (event.value.id === -1) {
      this.dialog
        .open(AddChapterDialogComponent, {
          width: '40%',
        })
        .afterClosed()
        .subscribe((res: any) => {
          if (res) {
            const itemToAdd = {
              id: 0,
              name: res.chapterName,
            };
            this.chapters = [...this.chapters, itemToAdd];
            this.chapter.setValue(itemToAdd);
          } else {
            this.chapter.setValue('');
          }
        });
    }
  }

  getBooks(): void {
    this.selectBookForm.reset();
    this.selectBookRandom.setValue('book');
    this.isBookLoading = true;
    this.books = [];
    this.books.push({
      targetLanguageId: 0,
      name: 'Add new book',
      id: -1,
    });
    this.bookChapterService
      .getBooksByLanguages(this.targetLanguage.value.id)
      .subscribe(
        (res: BookModel[]) => {
          if (res && res.length) {
            res.forEach((element) => {
              this.books.push(element);
            });
          }

          this.isBookLoading = false;
        },
        (error: string) => {
          this.isBookLoading = false;
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

  submitSelectedBooks(): void {
    if (this.selectBookRandom.value === 'book') {
      if (this.book.invalid) {
        this.notificationService.showMessage(
          'Please select a book',
          Severity.error,
          '',
          'bc'
        );
      } else {
        if (this.chapter.invalid) {
          this.notificationService.showMessage(
            'Please select a chapter',
            Severity.error,
            '',
            'bc'
          );
        }
      }

      if (this.selectBookForm.invalid) {
        return;
      }
    }
  }

  removeWordSeries(word: WordToAddModel): void {
    if (this.formData.words.length < 2) {
      this.notificationService.showMessage(
        'For this action you need to have at least 2 added words',
        Severity.error,
        '',
        'bc'
      );
      return;
    }
    const index = this.formData.words.indexOf(word);
    this.formData.words.splice(index, 1);
  }

  addWordSeries(el: Element): void {
    this.formData.words.push({
      base: '',
      targets: [{ value: '' }],
    });
    console.log(el);
    setTimeout(() => {
      el.scrollTo({ left: 0, top: el.scrollHeight, behavior: 'smooth' });
    }, 1);
  }

  disableAddTarget(word: WordToAddModel): boolean {
    return word.targets.filter((x) => x.value === '').length > 0;
  }

  disableRemoveTarget(word: WordToAddModel): boolean {
    return word.targets && word.targets.length <= 1;
  }

  removeTargetWord(word: WordToAddModel): void {
    word.targets.splice(word.targets.length - 1, 1);
  }

  addTargetWord(word: WordToAddModel): void {
    word.targets.push({ value: '' });
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
    this.getBooks();
  }
}
