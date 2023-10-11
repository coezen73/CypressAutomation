// in order to call our 'object' from support/pages/auth.js:
import { auth } from '../../support/pages/auth';
import { navigateTo } from '../../support/pages/navigation';

describe('Auth: Login user with different ways', () => {
  beforeEach('Navigate to Login Page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage(); // it is called from POM
  });
  it('Happy Path: Using POM-login function', () => {
    // auth.login('harcoded variables');  --> Not a good way. Instead:
    cy.fixture('user').then((user) => {
      auth.login(user.user3.username, user.user3.password);
      // Now we can verify the text by using our custom command in commands.js file:
      cy.textExists('You logged into a secure area!');
      auth.logout();
    });
  });
});
