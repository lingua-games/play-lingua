import { Component, HostListener, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FallingStarsWord } from '../../../core/models/falling-stars-word.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  TranslateModel,
  WordKeyValueModel,
} from '../../../core/models/word-key-value.model';
import { Store } from '@ngrx/store';
import { NotificationState } from '../../../core/component/score-notification/state/score-notification.reducer';
import { toggleNotification } from '../../../core/component/score-notification/state/score-notification.actions';
import { ScoreStorageService } from '../../../core/service/score-storage.service';
import { GameStartInformation } from '../../../core/models/game-start-information';
import { StartGameDialogComponent } from '../common-in-game/start-game-dialog/start-game-dialog.component';
import { GameInformationInterface } from '../../../core/models/game-information.interface';
import { BasicInformationService } from '../../../core/service/basic-information.service';
import { GameNameEnum } from '../../../core/models/game-name.enum';
import { ActivatedRoute } from '@angular/router';
import { InvitationForm } from '../../../core/models/invitation-form.interface';
import { ScoreStoreInterface } from '../../../core/models/score-store.interface';
import { ElementStyle } from '../../../core/models/element-style.model';
import { SecurityService } from '../../../core/service/security.service';
import { SpeechModel } from '../../../core/models/speech.model';

const secondsForTraver = 5000;
const bufferBeforeStart = 2000;

@Component({
  selector: 'app-falling-stars',
  templateUrl: './falling-stars.component.html',
  styleUrls: ['./falling-stars.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => true', [
        style({ top: '2%' }),
        animate(bufferBeforeStart, style({ top: '2%' })),
        animate(secondsForTraver, style({ top: '100%' })),
      ]),
    ]),
    // BELOW TRIGGER IS FOR EDIT DESIGN OF THE STARS
    // trigger('fade', [
    //   transition('void => true', [
    //     style({ opacity: '0', top: '-20%' }),
    //     animate(0.1, style({ opacity: '1', top: '+20%' })),
    //     animate(10000000000000, style({ top: '100%' })),
    //   ]),
    // ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FallingStarsComponent implements OnInit {
  words: FallingStarsWord[] = [];
  copyOfWords: FallingStarsWord[] = [];
  currentWord: FallingStarsWord = {} as FallingStarsWord;
  guidBoxShowing?: boolean;
  pressedNumber?: number;
  startTime?: number;
  bookId?: number;
  chapterId?: number;
  isGameFinished = false;
  feedbackForm?: InvitationForm;
  arabicPattern = /[\u0600-\u06FF]/;

  @HostListener('document:keyup ', ['$event'])
  keyUpEvent(event: KeyboardEvent): void {
    this.pressedNumber = 0;
    if (!this.words || !this.words.length) {
      return;
    }
    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      this.guidBoxShowing
    ) {
      this.playNextStar();
      return;
    }

    if (
      this.guidBoxShowing ||
      !this.words.find((x: FallingStarsWord) => x.animating)
    ) {
      return;
    }

    if (event.code === 'Digit1' || event.code === 'Numpad1') {
      this.checkSelectedAnswer(this.getAnswers()[0]);
    }

    if (event.code === 'Digit2' || event.code === 'Numpad2') {
      this.checkSelectedAnswer(this.getAnswers()[1]);
    }

    if (event.code === 'Digit3' || event.code === 'Numpad3') {
      this.checkSelectedAnswer(this.getAnswers()[2]);
    }

    if (event.code === 'Digit4' || event.code === 'Numpad4') {
      this.checkSelectedAnswer(this.getAnswers()[3]);
    }
  }

  @HostListener('document:keydown ', ['$event'])
  keyDownEvent(event: KeyboardEvent): void {
    if (event.code === 'Digit1' || event.code === 'Numpad1') {
      this.pressedNumber = 1;
    }

    if (event.code === 'Digit2' || event.code === 'Numpad2') {
      this.pressedNumber = 2;
    }

    if (event.code === 'Digit3' || event.code === 'Numpad3') {
      this.pressedNumber = 3;
    }

    if (event.code === 'Digit4' || event.code === 'Numpad4') {
      this.pressedNumber = 4;
    }

    if (event.code === 'Escape') {
      if (this.words.length) {
        this.showStartDialog();
      }
    }
  }

  constructor(
    private dialog: MatDialog,
    private store: Store<{}>,
    private scoreStorageService: ScoreStorageService,
    private basicInformationService: BasicInformationService,
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const invitationCode = paramMap.get('code');
      if (invitationCode) {
        this.feedbackForm = { uniqueKey: invitationCode } as InvitationForm;
      }
    });

    // Todo, uncomment below
    this.showStartDialog();
    this.scoreStorageService.clearCatch();
  }

  isLoggedIn(): boolean {
    return this.securityService.isLoggedIn().success;
  }

  showEndGameDialog(): void {
    this.isGameFinished = true;
    const dialog = this.dialog.open(StartGameDialogComponent, {
      disableClose: true,
      width: '60%',
      height: '62vh',
      maxHeight: '95vh',
      autoFocus: false,
      data: {
        name: 'Falling stars',
        code: GameNameEnum.fallingStars,
        gameNameForRanking: 'falling-stars',
        hints: this.basicInformationService.gameHints(
          GameNameEnum.fallingStars
        ),
        isFeedback: !!this.feedbackForm,
        scoreStore: {
          gameName: 'falling-stars',
          bookId: this.bookId,
          chapterId: this.chapterId,
          score: this.scoreStorageService.getCachedScores(),
        } as ScoreStoreInterface,
        // score: this.scoreStorageService.getCachedScores(),
        feedbackForm: this.feedbackForm,
        isGameFinished: true,
      } as GameInformationInterface,
    });

    dialog
      .afterClosed()
      .subscribe(
        (res: GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>) => {
          if (res && res.words && res.words.length) {
            this.copyOfWords = JSON.parse(JSON.stringify(res.words));
            this.bookId = res.bookId;
            this.chapterId = res.chapterId;
            this.setGameWords(res.words);
            this.startGame();
          }
        }
      );
  }

  showStartDialog(): void {
    this.words = [];
    this.guidBoxShowing = false;
    this.dialog
      .open(StartGameDialogComponent, {
        data: {
          name: 'Falling stars',
          code: GameNameEnum.fallingStars,
          gameNameForRanking: 'falling-stars',
          hints: this.basicInformationService.gameHints(
            GameNameEnum.fallingStars
          ),
          isFeedback: !!this.feedbackForm,
          feedbackForm: this.feedbackForm,
        } as GameInformationInterface,
        disableClose: true,
        width: '60%',
        height: '62vh',
        maxHeight: '95vh',
      })
      .afterClosed()
      .subscribe(
        (res: GameStartInformation<WordKeyValueModel<TranslateModel[]>[]>) => {
          if (res && res.words && res.words.length) {
            this.copyOfWords = JSON.parse(JSON.stringify(res.words));
            this.bookId = res.bookId;
            this.chapterId = res.chapterId;
            this.setGameWords(res.words);
            this.startGame();
          }
        }
      );
  }

  getAnswerSpeech(currentWord: FallingStarsWord): SpeechModel {
    return {
      code: currentWord.correctAnswers.find(
        (x) => x.value === currentWord.correctShowingAnswer
      )?.speechCode,
      status: currentWord.correctAnswers.find(
        (x) => x.value === currentWord.correctShowingAnswer
      )?.speechStatus,
    } as SpeechModel;
  }

  setGameWords(res: WordKeyValueModel<TranslateModel[]>[]): void {
    this.words = [];

    res.forEach((element: WordKeyValueModel<TranslateModel[]>) => {
      this.words.push({
        isCurrentlyPlaying: false,
        key: element.key,
        speechCode: element.speechCode,
        speechStatus: element.speechStatus,
        correctAnswers: element.translates,
        style: {
          left: `${this.getRandomNumber()}%`,
          animation: 'loading-star-animation 300ms linear infinite',
          fontSize: this.arabicPattern.test(element.key) ? '1.4vw' : '1vw',
          fontWeight: this.arabicPattern.test(element.key) ? '700' : 'normal',
        } as ElementStyle,
        selectedAnswer: '',
        correctShowingAnswer: '',
        animating: false,
        possibleAnswers: this.generateRandomOptions(element, res),
        keyIsPressing: false,
        wrongCount: 0,
        isBlinking: true,
      });
    });
  }

  getRandomNumber(): number {
    const result = Math.floor(Math.random() * 90 + 10);
    // If left of the object would be more than 95%,
    // then the object overflow from right side of the screen
    return result > 85 ? result - 10 : result;
  }

  getAnswers(): string[] {
    return this.words
      .filter((x: FallingStarsWord) => x.animating)
      .map((y) => y.possibleAnswers)[0];
  }

  generateRandomOptions(
    targetWord: WordKeyValueModel<TranslateModel[]>,
    allWords: WordKeyValueModel<TranslateModel[]>[]
  ): string[] {
    const result: string[] = [];
    const copyOfAllWords: WordKeyValueModel<TranslateModel[]>[] = JSON.parse(
      JSON.stringify(
        allWords.filter(
          (x: WordKeyValueModel<TranslateModel[]>) => x.key !== targetWord.key
        )
      )
    );

    if (!targetWord || !targetWord.translates || !targetWord.key) {
      return [];
    }
    // Filling the correct option
    const answerPlace = Math.round(Math.random() * (3 - 0));
    const answersLength = targetWord.translates.length;
    if (answersLength === 1) {
      result[answerPlace] = targetWord.translates[0].value || '';
    } else {
      // if the word has more than 1 answers, get one randomly
      result[answerPlace] =
        targetWord.translates[Math.round(Math.random() * (answersLength - 1))]
          .value || '';
    }

    // Filling the rest of options
    for (let i = 0; i < 4; i++) {
      if (!result[i]) {
        const randomIndex = Math.round(
          Math.random() * (copyOfAllWords.length - 1)
        );
        result[i] = copyOfAllWords[randomIndex].translates[0].value || '';
        copyOfAllWords.splice(randomIndex, 1);
      }
    }

    return result;
  }

  startGame(): void {
    this.isGameFinished = false;
    this.startTime = Date.now();
    if (this.words[0]) {
      setTimeout(() => {
        this.words[0].style.animation = '';
        this.words[0].isBlinking = false;
      }, bufferBeforeStart);
      this.words[0].animating = true;
      this.words[0].isCurrentlyPlaying = true;
    }
  }

  boxAnimationDone(
    word: FallingStarsWord,
    isCalledFromView: boolean = false
  ): void {
    this.currentWord = word;
    if (!this.getAnswers()) {
      return;
    }
    this.currentWord.correctShowingAnswer =
      this.currentWord.correctAnswers.filter((x: TranslateModel) =>
        this.getAnswers().find((y: string) => x.value === y)
      )[0]?.value || '';
    word.animating = false;
    if (!word.selectedAnswer) {
      this.showGuidBox();
      word.wrongCount++;
      word.style = {
        left: `${this.getRandomNumber()}%`,
        animation: 'loading-star-animation 300ms linear infinite',
        fontSize: this.arabicPattern.test(word.key) ? '1.4vw' : '1vw',
        fontWeight: this.arabicPattern.test(word.key) ? '700' : 'normal',
      } as ElementStyle;
      word.isBlinking = true;
      this.words.push(JSON.parse(JSON.stringify(word)));

      this.words.map((x) => (x.isCurrentlyPlaying = false));
      this.words[this.words.indexOf(this.currentWord) + 1].isCurrentlyPlaying =
        true;
    } else {
      if (
        word.correctAnswers.find(
          (x: TranslateModel) => x.value === word.selectedAnswer
        )
      ) {
        if (!isCalledFromView) {
          this.store.dispatch(
            toggleNotification({
              gameName: 'Falling stars',
              message: 'I am the message',
              score: this.calculateScore(word.wrongCount),
            } as NotificationState)
          );
          this.scoreStorageService.catchScores(
            this.calculateScore(word.wrongCount)
          );
        }
        this.playNextStar();
      } else {
        this.showGuidBox();
        word.wrongCount++;
        word.style = {
          left: `${this.getRandomNumber()}%`,
          animation: 'loading-star-animation 300ms linear infinite',
          fontSize: this.arabicPattern.test(word.key) ? '1.4vw' : '1vw',
          fontWeight: this.arabicPattern.test(word.key) ? '700' : 'normal',
        } as ElementStyle;
        word.isBlinking = true;
        this.words.push(JSON.parse(JSON.stringify(word)));

        this.words.map((x) => (x.isCurrentlyPlaying = false));
        this.words[
          this.words.indexOf(this.currentWord) + 1
        ].isCurrentlyPlaying = true;
      }
    }
  }

  calculateScore(wrongCount: number): number {
    // It is the travelled time of the object before user hit the correct Answer.
    const travelledBeforeHit =
      (secondsForTraver +
        bufferBeforeStart -
        (Date.now() - (this.startTime || 0))) /
      1000;

    // Below line `/ 1000` is converting Milli seconds to seconds
    const result = travelledBeforeHit * (10 / (secondsForTraver / 1000));

    // To show only one decimal number after decimal point

    if (wrongCount && wrongCount > 0) {
      // The final result should divide by wrong count
      return Math.round((result / (wrongCount + 1)) * 10) / 10;
    }
    return Math.round(result * 10) / 10;
  }

  showGuidBox(): void {
    this.guidBoxShowing = true;
  }

  getCountOfRemainWords(): number {
    const currentlyPlaying = this.words.find((x) => x.isCurrentlyPlaying);

    let currentIndex = 0;
    if (currentlyPlaying) {
      currentIndex = this.words.indexOf(currentlyPlaying);
    }
    return this.words.length - currentIndex;
  }

  playNextStar(): void {
    this.startTime = Date.now();
    this.guidBoxShowing = false;
    if (this.words.length === this.words.indexOf(this.currentWord) + 1) {
      // It means the game is finish
      setTimeout(() => {
        this.showEndGameDialog();
      }, 1000);
    } else {
      this.words[this.words.indexOf(this.currentWord) + 1].animating = true;
      this.words.map((x) => (x.isCurrentlyPlaying = false));
      this.words[this.words.indexOf(this.currentWord) + 1].isCurrentlyPlaying =
        true;

      setTimeout(() => {
        if (this.words[this.words.indexOf(this.currentWord) + 1]) {
          this.words[this.words.indexOf(this.currentWord) + 1].isBlinking =
            false;
          this.words[this.words.indexOf(this.currentWord) + 1].style.animation =
            '';
        }
      }, bufferBeforeStart);
    }
  }

  checkSelectedAnswer(item: string): void {
    const activeWord = this.words.find((x: FallingStarsWord) => x.animating);
    if (activeWord?.isBlinking) {
      return;
    }
    (activeWord || ({} as FallingStarsWord)).selectedAnswer = item;
    this.boxAnimationDone(activeWord as FallingStarsWord);
  }

  isPressing(answer: string): boolean {
    return (
      (this.words
        ?.find((x: FallingStarsWord) => x.animating)
        ?.possibleAnswers?.indexOf(answer) || 0) +
        1 ===
      this.pressedNumber
    );
  }
}
