import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../../../core/models/book.model';
import { BookChapterService } from '../../../../core/service/book-chapter.service';
import { LanguageModel } from '../../../../core/models/language.model';
import { ChapterModel } from '../../../../core/models/chapter.model';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-start-game-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.scss'],
})
export class StartGameDialogComponent implements OnInit {
  books: BookModel[] = [];
  chapters: ChapterModel[] = [];
  form: {
    selectedBook: BookModel;
    selectedChapter: ChapterModel;
  } = {} as any;

  defaultLanguages: {
    defaultBaseLanguage: LanguageModel;
    defaultTargetLanguage: LanguageModel;
  } = JSON.parse(localStorage.getItem('lingua-default-languages'));

  constructor(
    private bookChapterService: BookChapterService,
    private router: Router,
    public dialogRef: MatDialogRef<StartGameDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookChapterService
      .getBooksBySourceAndTargetLanguageId(
        this.defaultLanguages.defaultBaseLanguage.id,
        this.defaultLanguages.defaultTargetLanguage.id
      )
      .subscribe(
        (res: any) => {
          this.books.push({
            id: 0,
            name: 'No book, just random',
            targetLanguageId: 0,
            sourceLanguageId: 0,
          });
          this.books = this.books.concat(res);
          this.form.selectedBook = this.books[0];
        },
        () => {}
      );
  }

  getChapters(selectedBook: BookModel): void {
    this.chapters = [];
    this.bookChapterService
      .getChaptersByBookId(selectedBook.id)
      .subscribe((res: ChapterModel[]) => {
        this.chapters.push({
          id: 0,
          name: 'No chapter, just random',
        });
        this.chapters = this.chapters.concat(res);
        this.form.selectedChapter = this.chapters[0];
      });
  }

  backToMenu(): void {
    this.router.navigate(['../game-menu']);
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close();
  }
}
