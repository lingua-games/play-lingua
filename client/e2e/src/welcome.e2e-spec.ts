import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { url } from 'inspector';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  beforeAll(() => {});

  afterEach(() => {});

  afterAll(() => {});

  it('The header of welcome page should present Play-Lingua', () => {
    const expectedText = element(by.css('.title-header')).getText();

    expect(expectedText).toEqual('Play-Lingua');
  });

  it('The header should present Play & Learn a New Language!', () => {
    const expectedText = element(by.css('.motto')).getText();

    expect(expectedText).toEqual('Play & Learn a New Language!');
  });

  it("should present Let's Get Started! button", () => {
    const expectedText = element(by.css('.start-button')).getText();

    expect(expectedText).toEqual("Let's Get Started!");
  });

  it("should open the games-menu page when clicked on Let's Get Started! button", () => {
    element(by.css('.start-button')).click();
    const expectedURL = browser.getCurrentUrl();

    expect(expectedURL).toEqual('http://localhost:4200/#/main');
  });

  it('should present a background picture', () => {
    const expectedBackgroundImage = element(
      by.css('.welcome-body')
    ).getCssValue('background-image');

    expect(expectedBackgroundImage).toContain('welcome-background.png');
  });
});
