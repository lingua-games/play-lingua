import { RegisterPage } from './register.po';

describe('register', () => {
  let page: RegisterPage;

  beforeAll(() => {
    page = new RegisterPage();
    page.navigateTo();
  });

  describe('buttons', () => {
    it('should present back button', () => {
      expect(page.getBackButton().isPresent()).toBeTruthy();
    });

    it('should present register button', (done) => {
      page
        .getRegisterButton()
        .getText()
        .then((res) => {
          expect(res[0]).toBe('Register');
          done();
        });
    });

    it('register should be DISABLE when user has not filled the form yet', () => {
      expect(page.getRegisterButton().first().isEnabled()).toBe(false);
    });
  });

  describe('input email', () => {
    it('should present input for email', (done) => {
      page
        .getEmailInput()
        .isPresent()
        .then((res) => {
          expect(res).toBe(true);
          done();
        });
    });
  });
});
