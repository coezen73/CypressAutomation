// In order to call our 'object' from support/pages/auth.js: Importing/Direct object calling
import { auth } from '../../support/pages/auth';
import { navigateTo } from '../../support/pages/navigation';

// Another Approach: Creating an object here,
//  and make it reach all objects inside the targeted(auth.js) file
const LoginLocators = require('../../support/pages/auth');

describe('Auth: Login user with different ways', () => {
  beforeEach('Navigate to Login Page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage(); // it is called from POM
  });
  it.skip('Happy Path: By Using POM FUNCTION', () => {
    // auth.login('harcoded variables');  --> Not a good way. Instead:
    cy.fixture('user').then((user) => {
      auth.login(user.user3.username, user.user3.password);
    });
    // Now we can verify the text by using our custom command in commands.js file:
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Happy Path: By Using POM LOCATORS', () => {
    cy.fixture('user').then((user) => {
      // Use LoginLocators object to call targeted objects(locators) in the 'auth.js file'
      LoginLocators.locators.userName.type(user.user3.username);
      LoginLocators.locators.password.type(user.user3.password);
      LoginLocators.locators.submit.click();
    });
    // Now we can verify the text by using our custom command in commands.js file:
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Negative Test: Invalid User Credentials', () => {
    auth.login('invalid123', 'invalid234');
    // Verify error message by using custom function:
    cy.textExists('Your username is invalid!'); 
  });

});
