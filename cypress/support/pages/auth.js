/* 
    Difference than Java:
            - Class name doesn't have to be same with file name
            - CAN be more than one class in the file
            - None of them has superiority over each other        */

// our class will hold 2 functions:

class Auth {
  login(user_name, password) {
    cy.get('[name="username"]').type(user_name);
    cy.get('[name="password"]').type(password);
    cy.get('#wooden_spoon').click();
  }

  logout() {
    // this time we use text approach to locate the webelement
    cy.contains('Logout').should('be.visible').click();
  }
}

//--------------------------------------------------------------------------------

/* Create another class here: 
We can apply 'findBy' annotation of Selenium with Cypress to call the locators.
The difference from Selenium is that we create functions here;  */

class Locators {
  get userName() {
    // <- Webelement variable name
    return cy.get('[name="username"]', { timeout: 10000 });
    // I can define custom Timeout for a spesific element like here. It is dynamic.
  }

  get password() {
    return cy.get('[name="password"]', { timeout: 10000 });
  }

  get submit() {
    return cy.get('#wooden_spoon');
  }
}
const locators = new Locators();

// Create the object of these classes to be able to export:
const auth = new Auth();
// Then export the objects:
module.exports = {
  auth,
  locators,
};
