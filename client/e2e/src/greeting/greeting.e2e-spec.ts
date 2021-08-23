import { GreetingPage } from './greeting.po';
import { browser } from 'protractor';

describe('greeting', () => {
  let page: GreetingPage;

  beforeEach(() => {
    page = new GreetingPage();
    page.navigateTo();
  });

  describe('Titles', () => {
    it('should show titles', (done) => {
      page
        .getTitles()
        .getText()
        .then((res) => {
          expect(res[0]).toBe(
            'Play lingua is a free and open source platform for learn new language(s)'
          );
          expect(res[1]).toBe('Do you want to');
          done();
        });
    });
  });

  describe('Buttons', () => {
    it('should show buttons', (done) => {
      page
        .getButtons()
        .getText()
        .then((res) => {
          expect(res[0]).toBe('Login');
          expect(res[1]).toBe('Register');
          expect(res[2]).toBe('Play as a guest');
          done();
        });
    });

    it('should navigate to login page after clicking on login', () => {
      page.getButtons().first().click();

      expect(browser.getCurrentUrl()).toContain('/#/login');
    });

    it('should navigate to register page after clicking on register', () => {
      page.getButtons().get(1).click();

      expect(browser.getCurrentUrl()).toContain('/#/register');
    });

    it('should navigate to game-menu page after clicking on play as a guest', () => {
      page.getButtons().get(2).click();

      expect(browser.getCurrentUrl()).toContain('/#/game-menu');
    });
  });
});
