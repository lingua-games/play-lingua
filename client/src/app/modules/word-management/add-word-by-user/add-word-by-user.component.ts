import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LanguageModel } from '../../../core/models/language.model';
import {
  NotificationService,
  Severity,
} from '../../../core/service/notification.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BookChapterService } from '../../../core/service/book-chapter.service';
import { BookModel } from '../../../core/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { AddWordFormModel } from '../../../core/models/add-word-form.model';
import {
  SourceTargetModel,
  WordToAddModel,
} from '../../../core/models/word-to-add.model';
import { ChapterModel } from '../../../core/models/chapter.model';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { AddChapterDialogComponent } from '../add-chapter-dialog/add-chapter-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalStorageHelper } from '../../../core/models/local-storage.enum';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { WordManagementService } from '../../../core/service/word-management.service';
import { environment } from '../../../../environments/environment';
import { WordOverviewsModel } from '../../../core/models/word-overviews.model';
import { forkJoin } from 'rxjs';
import { WordDetails } from '../../../core/models/word-details.model';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { ApiResult } from '../../../core/models/api-result.model';

@Component({
  selector: 'app-add-word-by-user',
  templateUrl: './add-word-by-user.component.html',
  styleUrls: ['./add-word-by-user.component.scss'],
})
export class AddWordByUserComponent implements OnInit {
  @ViewChild('container') container: ElementRef = {} as ElementRef;
  languages: ApiResult<LanguageModel[]> = new ApiResult<LanguageModel[]>();
  books: BookModel[] = [];
  chapters: ChapterModel[] = [];
  isBookLoading?: boolean;
  isPageLoading?: boolean;
  formData: AddWordFormModel = {} as AddWordFormModel;
  wordsForEdit: WordOverviewsModel = {} as WordOverviewsModel;
  isPreparingForEdit = false;
  isEditing = false;

  selectLanguageForm = this.formBuilder.group({
    baseLanguage: ['', Validators.required],
    targetLanguage: ['', Validators.required],
    isSelectedLanguageSubmit: [false],
  });

  selectBookForm = this.formBuilder.group({
    book: ['', Validators.required],
    chapter: ['', Validators.required],
  });

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
      if (
        this.isSelectedLanguageSubmit &&
        this.isSelectedLanguageSubmit.value
      ) {
        this.addWordSeries(this.container.nativeElement);
      }
    }
  }

  get baseLanguage(): AbstractControl | null {
    return this.selectLanguageForm.get('baseLanguage');
  }

  get targetLanguage(): AbstractControl | null {
    return this.selectLanguageForm.get('targetLanguage');
  }

  get isSelectedLanguageSubmit(): AbstractControl | null {
    return this.selectLanguageForm.get('isSelectedLanguageSubmit');
  }

  get book(): AbstractControl | null {
    return this.selectBookForm.get('book');
  }

  get chapter(): AbstractControl | null {
    return this.selectBookForm.get('chapter');
  }

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private bookChapterService: BookChapterService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private wordManagementService: WordManagementService,
    private basicInformationService: BasicInformationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['code']) {
        this.wordsForEdit = this.localStorageService.decryptData(
          params['code'],
          environment.secretKeys.queryParameters
        );
      }
    });

    if (this.wordsForEdit?.baseLanguageId) {
      this.isEditing = true;
      this.prepareEditForm();
    } else {
      this.getLanguages();
      this.isEditing = false;
      this.checkDraft();
    }

    this.isSelectedLanguageSubmit?.valueChanges.subscribe((value) => {
      if (value) {
        this.baseLanguage?.disable();
        this.targetLanguage?.disable();
      } else {
        this.baseLanguage?.enable();
        this.targetLanguage?.enable();
      }
    });
  }

  getLanguages(): void {
    this.languages.setLoading(true);
    this.basicInformationService.getAllLanguages().subscribe(
      (res: LanguageModel[]) => {
        this.languages.setData(res);
      },
      () => {
        this.languages.setError('Unable to load languages');
      }
    );
  }

  prepareEditForm(): void {
    this.isPreparingForEdit = true;
    const servicesToCall = [];

    servicesToCall.push(
      this.wordManagementService.getWordDetails(this.wordsForEdit)
    );

    servicesToCall.push(this.basicInformationService.getAllLanguages());

    servicesToCall.push(
      this.bookChapterService.getBooksBySourceAndTargetLanguageId(
        this.wordsForEdit.baseLanguageId,
        this.wordsForEdit.targetLanguageId
      )
    );

    if (this.wordsForEdit.bookId) {
      servicesToCall.push(
        this.bookChapterService.getChaptersByBookId(this.wordsForEdit.bookId)
      );
    }

    forkJoin(servicesToCall).subscribe(
      (
        res: (BookModel[] | ChapterModel[] | WordDetails[] | LanguageModel[])[]
      ) => {
        this.languages.setData(res[1] as LanguageModel[]);
        this.baseLanguage?.setValue(
          this.languages.data.find(
            (x) => x.id === this.wordsForEdit.baseLanguageId
          )
        );
        this.targetLanguage?.setValue(
          this.languages.data.find(
            (x) => x.id === this.wordsForEdit.targetLanguageId
          )
        );

        this.submitSelectedLanguages();

        this.books = [];
        this.books = [
          {
            targetLanguageId: 0,
            name: 'Add new book',
            baseLanguageId: 0,
            id: -1,
          },
        ];
        (res[2] as BookModel[]).forEach((element: BookModel) => {
          this.books.push(element);
        });
        this.book?.setValue(
          this.books.find((x) => x.id === this.wordsForEdit.bookId)
        );

        if (this.wordsForEdit.bookId) {
          this.chapters = [];
          this.chapters = [
            {
              id: -1,
              name: 'Add new chapter',
            },
          ];
          (res[3] as ChapterModel[]).forEach((chapter: ChapterModel) => {
            this.chapters.push(chapter);
          });
          this.chapter?.setValue(
            this.chapters.find((x) => x.id === this.wordsForEdit.chapterId)
          );
        }

        (res[0] as WordDetails[]).forEach((element: WordDetails) => {
          const filteredElement = (res[0] as WordDetails[]).filter(
            (x) => x.baseWord === element.baseWord
          );
          if (
            this.formData.words &&
            !this.formData.words.find((x) => x.base.value === element.baseWord)
          ) {
            const targetsToAdd = filteredElement.map((x) => {
              return { value: x.translate, isValid: true };
            });

            this.formData.words.push({
              base: { value: filteredElement[0].baseWord, isValid: true },
              targets: targetsToAdd,
            });
          }
        });

        this.isPreparingForEdit = false;
      },
      () => {},
      () => {}
    );
  }

  checkDraft(): void {
    if (!this.localStorageService.load(LocalStorageHelper.addWordDraft)) {
      return;
    }

    const draft = JSON.parse(
      this.localStorageService.load(LocalStorageHelper.addWordDraft)
    ) as AddWordFormModel;

    this.baseLanguage?.setValue(draft.baseLanguage);
    this.targetLanguage?.setValue(draft.targetLanguage);

    if (!!draft.targetLanguage && !!draft.baseLanguage) {
      this.isSelectedLanguageSubmit?.setValue(true);

      this.getBooks();
      if (draft.book) {
        this.book?.setValue(draft.book);
        this.bookSelectionChange({ value: draft.book });
        this.chapter?.setValue(draft.chapter);
      }
    }

    this.formData.words = draft.words;
  }

  bookSelectionChange(event: { value: BookModel }): void {
    if (event.value.id === -1) {
      this.dialog
        .open(AddBookDialogComponent, {
          width: '40%',
        })
        .afterClosed()
        .subscribe((res: { bookName: string }) => {
          if (res) {
            if (this.books.find((x) => x.name === res.bookName)) {
              this.book?.setValue(
                this.books.find((x) => x.name === res.bookName)
              );
            } else {
              const itemToAdd = {
                id: 0,
                targetLanguageId: this.targetLanguage?.value.id,
                baseLanguageId: this.baseLanguage?.value.id,
                name: res.bookName,
              };
              this.books = [...this.books, itemToAdd];
              this.book?.setValue(itemToAdd);

              this.chapters = [];
              this.chapters.push({
                id: -1,
                name: 'Add new chapter',
              });
            }
          } else {
            this.book?.setValue('');
          }
        });
    } else {
      this.getChapters(event.value.id);
    }
  }

  getChapters(bookId: number): void {
    if (bookId <= 0) {
      this.chapters = [
        {
          id: -1,
          name: 'Add new chapter',
        },
      ];
      return;
    }
    this.bookChapterService
      .getChaptersByBookId(bookId)
      .subscribe((res: ChapterModel[]) => {
        this.chapters = [
          {
            id: -1,
            name: 'Add new chapter',
          },
        ];
        if (res && res.length) {
          res.forEach((chapter) => {
            this.chapters.push(chapter);
          });
        }
      });
  }

  chapterSelectionChange(event: { value: ChapterModel }): void {
    if (event.value.id === -1) {
      this.dialog
        .open(AddChapterDialogComponent, {
          width: '40%',
        })
        .afterClosed()
        .subscribe((res: { chapterName: string }) => {
          if (res) {
            if (this.chapters.find((x) => x.name === res.chapterName)) {
              this.chapter?.setValue(
                this.chapters.find((x) => x.name === res.chapterName)
              );
            } else {
              const itemToAdd = {
                id: 0,
                name: res.chapterName,
              };
              this.chapters = [...this.chapters, itemToAdd];
              this.chapter?.setValue(itemToAdd);
            }
          } else {
            this.chapter?.setValue('');
          }
        });
    }
  }

  getBooks(): void {
    this.selectBookForm.reset();
    this.isBookLoading = true;
    this.bookChapterService
      .getBooksByLanguage(
        this.targetLanguage?.value.id,
        this.baseLanguage?.value.id
      )
      .subscribe(
        (res: BookModel[]) => {
          this.books = [
            {
              targetLanguageId: 0,
              name: 'Add new book',
              baseLanguageId: 0,
              id: -1,
            },
          ];
          if (res && res.length) {
            res.forEach((element) => {
              this.books.push(element);
            });
          }
          this.isBookLoading = false;
        },
        () => {
          this.isBookLoading = false;
        }
      );
  }

  submitSelectedBooks(): void {
    if (this.book?.invalid) {
      this.notificationService.showMessage(
        'Please select a book',
        Severity.error,
        '',
        'bc'
      );
    } else {
      if (this.chapter?.invalid) {
        this.notificationService.showMessage(
          'Please select a chapter/reference',
          Severity.error,
          '',
          'bc'
        );
      }
    }

    if (this.selectBookForm?.invalid) {
      return;
    }
  }

  removeWordSeries(word: WordToAddModel): void {
    const index = this.formData.words.indexOf(word);
    this.formData.words.splice(index, 1);
  }

  addWordSeries(el: Element): void {
    if (!this.formData.words) {
      this.formData.words = [];
    }
    this.formData.words.push({
      base: { value: '', isValid: true },
      targets: [{ value: '', isValid: true }],
    });
    setTimeout(() => {
      el.scrollTo({ left: 0, top: el.scrollHeight, behavior: 'smooth' });
    }, 1);
  }

  disableAddTarget(word: WordToAddModel): boolean {
    return (
      word.targets.filter((x: SourceTargetModel) => x.value === '').length > 0
    );
  }

  disableRemoveTarget(word: WordToAddModel): boolean {
    return word.targets && word.targets.length <= 1;
  }

  removeTargetWord(word: WordToAddModel): void {
    word.targets.splice(word.targets.length - 1, 1);
  }

  addTargetWord(word: WordToAddModel): void {
    word.targets.push({ value: '', isValid: true });
  }

  submitForm(): void {
    if (this.book?.invalid) {
      this.notificationService.showMessage(
        'Please select a book',
        Severity.error,
        '',
        'bc'
      );
    }
    if (this.chapter?.invalid) {
      this.notificationService.showMessage(
        'Please select a chapter/reference',
        Severity.error,
        '',
        'bc'
      );
    }
    if (this.selectBookForm?.invalid) {
      this.selectBookForm?.markAsDirty();
      return;
    }
    if (!this.formData.words || this.formData.words.length === 0) {
      this.notificationService.showMessage(
        'You should at least add a word',
        Severity.error,
        '',
        'bc'
      );
      return;
    }

    let isWordFormValid = true;
    this.formData.words.forEach((word: WordToAddModel) => {
      if (!word.base.value) {
        word.base.isValid = false;
        isWordFormValid = false;
      }

      word.targets.forEach((target: SourceTargetModel) => {
        if (!target.value) {
          target.isValid = false;
          isWordFormValid = false;
        }
      });
    });

    if (!isWordFormValid) {
      this.notificationService.showMessage(
        'You should fill all the required fields (red boxes)',
        Severity.error,
        '',
        'bc'
      );
      return;
    }

    this.formData.words.forEach((word: WordToAddModel) => {
      if (word.base.value && word.base.value.length > 15) {
        word.base.isValid = false;
        isWordFormValid = false;
      }

      word.targets.forEach((target: SourceTargetModel) => {
        if (target.value && target.value.length > 15) {
          target.isValid = false;
          isWordFormValid = false;
        }
      });
    });

    if (!isWordFormValid) {
      this.notificationService.showMessage(
        'The word(s) are too long, acceptable length is less than 15',
        Severity.error,
        '',
        'bc'
      );
      return;
    }

    this.formData.words.forEach((word: WordToAddModel) => {
      const foundBaseWords = this.formData.words.filter(
        (x) => x.base.value === word.base.value
      );
      if (foundBaseWords.length > 1) {
        isWordFormValid = false;
        foundBaseWords.map((x) => (x.base.isValid = false));
      }
    });

    if (!isWordFormValid) {
      this.notificationService.showMessage(
        'Duplicate detected in Questions',
        Severity.error,
        '',
        'bc'
      );
      return;
    }

    if (this.formData.words.length < 5) {
      this.notificationService.showMessage(
        'You should add more than 4 words in each session',
        Severity.error,
        '',
        'bc'
      );
      return;
    }

    this.isPageLoading = true;
    this.saveInformationInfoForm();

    const apiService = this.isEditing
      ? this.wordManagementService.editForm(this.formData)
      : this.wordManagementService.submitForm(this.formData);

    apiService.subscribe(
      () => {
        this.isPageLoading = false;
        this.localStorageService.delete(LocalStorageHelper.addWordDraft);
        this.router.navigate(['/word-management/list']).then();
      },
      () => {
        this.isPageLoading = false;
      }
    );
  }

  saveInformationInfoForm(): void {
    this.formData.baseLanguage = this.baseLanguage?.value;
    this.formData.targetLanguage = this.targetLanguage?.value;
    this.formData.book = this.book?.value;
    this.formData.chapter = this.chapter?.value;
  }

  saveToDraft(): void {
    this.saveInformationInfoForm();
    this.localStorageService.save(
      LocalStorageHelper.addWordDraft,
      JSON.stringify(this.formData)
    );
    this.notificationService.showMessage(
      'Saved to draft',
      Severity.success,
      '',
      'bc'
    );
  }

  submitSelectedLanguages(): void {
    if (this.isSelectedLanguageSubmit?.value) {
      this.isSelectedLanguageSubmit?.setValue(false);
      return;
    }
    if (this.selectLanguageForm?.invalid) {
      this.selectLanguageForm?.markAsDirty();
      if (this.baseLanguage?.invalid) {
        this.notificationService.showMessage(
          'Base language has not selected yet',
          Severity.error,
          '',
          'bc'
        );
      }

      if (this.targetLanguage?.invalid) {
        this.notificationService.showMessage(
          'Target language has not selected yet',
          Severity.error,
          '',
          'bc'
        );
      }
      return;
    }
    this.isSelectedLanguageSubmit?.setValue(true);
    this.formData.words = [];
    this.getBooks();
  }
}
