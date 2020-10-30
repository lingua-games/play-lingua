import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

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
});
