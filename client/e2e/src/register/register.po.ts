import { browser, by, element, ElementArrayFinder } from 'protractor';

export class RegisterPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/#/register') as Promise<unknown>;
  }

  getEmailInput(): ElementArrayFinder {
    return element.all(by.className('form-control'));
  }

  getBackButton(): ElementArrayFinder {
    return element.all(
      by.className('btn-back p-button-rounded p-button-info p-button-outlined')
    );
  }

  getRegisterButton(): ElementArrayFinder {
    return element.all(by.className('btn btn-success'));
  }

  getCaptcha(): ElementArrayFinder {
    return element.all(by.className('recaptcha-checkbox-checkmark'));
  }
}
