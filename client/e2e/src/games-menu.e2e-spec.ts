import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.get(browser.baseUrl + '/main');
  });

  it('should present Select a game as header', () => {
    const expectedText = element(by.css('.title-container')).getText();
    expect(expectedText).toEqual('Select a game');
  });

  describe('Supper Mario menu', () => {
    let superMarioPlayButton;
    let superMarioDiv;
    beforeEach(() => {
      superMarioPlayButton = element.all(by.css('.play-button')).get(0);
      superMarioDiv = element.all(by.css('.game-container')).get(0);
    });
    it('should present Super Mario as the game name', () => {
      const expectedText = superMarioDiv.$('p').getText();
      expect(expectedText).toEqual('Super Mario');
    });
    it('should present an image', () => {
      const expectedImage = element(by.css("img[src*='super-mario.png']"));

      expect(expectedImage.isPresent()).toBe(true);
    });

    it('should present Play button', () => {
      const expectedText = superMarioPlayButton.getText();

      expect(expectedText).toEqual('Play');
    });
  });

  describe('Falling Stars menu', () => {
    let fallingStarsPlayButton;
    let fallingStarsDiv;

    beforeEach(() => {
      fallingStarsPlayButton = element.all(by.css('.play-button')).get(1);
      fallingStarsDiv = element.all(by.css('.game-container')).get(1);
    });

    it('should present Falling Stars as the game name', () => {
      const expectedText = fallingStarsDiv.$('p').getText();
      expect(expectedText).toEqual('Falling Stars');
    });

    it('should present an image', () => {
      const expectedImage = element(by.css("img[src*='falling-star.png']"));

      expect(expectedImage.isPresent()).toBe(true);
    });

    it('should present Play button', () => {
      const expectedText = fallingStarsPlayButton.getText();

      expect(expectedText).toEqual('Play');
    });

    it('should open the falling-stars page when clicked on Play button', () => {
      fallingStarsPlayButton.click();

      const expectedUrl = browser.getCurrentUrl();

      expect(expectedUrl).toEqual('http://localhost:4200/main/falling-stars');
    });
  });
});
