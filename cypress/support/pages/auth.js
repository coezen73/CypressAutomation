/* 
    Difference than Java:
            - class name doesn't have to be same with file name
            - Can be more than one class in the file
            - None of them has superiority over each other        */

class Auth {
  // our class will hold 2 functions:
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
// Create the object of this class first:
const auth = new Auth();
// Then export 'auth' object:
module.exports = {
  auth,
};
