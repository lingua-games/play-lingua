import {
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
} from 'protractor';

export class GreetingPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitles(): ElementArrayFinder {
    return element.all(by.className('text-item'));
  }

  getButtons(): ElementArrayFinder {
    return element.all(by.className('btn'));
  }
}
