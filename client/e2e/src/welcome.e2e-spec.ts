import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { url } from 'inspector';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    // arrange part for all of the tests below
    page = new AppPage();
    page.navigateTo();
  });

  beforeAll(() => {});

  afterEach(() => {});

  afterAll(() => {});

  it('The header of welcome page should present Play-Lingua', () => {
    // Arrange

    // Act
    const expectedText = element(by.css('.title-header')).getText();

    // Assert
    expect(expectedText).toEqual('Play-Lingua');
  });

  it('The header should present Play & Learn a New Language!', () => {
    // Arrange

    // Act
    const expectedText = element(by.css('.motto')).getText();

    // Assert
    expect(expectedText).toEqual('Play & Learn a New Language!');
  });

  it("should present Let's Get Started! button", () => {
    // arrange: before Each()

    // act
    const expectedText = element(by.css('.start-button')).getText();

    // assert
    expect(expectedText).toEqual("Let's Get Started!");
  });

  it("should open the games-menu page when clicked on Let's Get Started! button", () => {
    //act
    element(by.css('.start-button')).click();
    const expectedURL = browser.getCurrentUrl();

    // assert
    expect(expectedURL).toEqual('http://localhost:4200/main');
  });

  it('should present Admin button', () => {
    const expectedText = element(by.css('.admin-button')).getText();
    expect(expectedText).toEqual('Admin');
  });

  it('should present a background picture', () => {
    const expectedBackgroundImage = element(
      by.css('.welcome-body')
    ).getCssValue('background-image');

    expect(expectedBackgroundImage).toContain('welcome-background.png');
  });
});
