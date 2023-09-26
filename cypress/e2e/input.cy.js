/// <reference types="cypress" />

describe('Input Forms in Tests', () => {
   
    beforeEach('Navigate to Registration Page',() => {
      // runs before each test case
      cy.clearCookies();
      cy.visit('/registration_form')
    });
  
    it('Check different input box fields and verify', () => {
      // fill the form:
      cy.get('input[name="firstname"]').type('Max');
      cy.get('input[name="lastname"]').type('Mustermann');
      cy.get('input[name="username"]').type('Max2001');

     /* Math.floor : makes it a whole number  
        Math.random(): creates a number between 0 - 1 ~ 0.005678     */ 
      // Mail:
     const email = `testmail${Math.floor(100000 + Math.random() * 900000)}@mail.com`;
      cy.get('input[name="email"]').type(email);
      // password:
      const password = `test${Math.floor(100000 + Math.random() * 900000)}`;
      cy.get('input[name="password"]').type(password);
      // phoneNumber:
      const phoneNumber = `555-000-${Math.floor(1000 + Math.random() * 9000)}`; // 4 digit extension number
      cy.get('input[name="phone"]').type(phoneNumber);

      cy.get('input[name="birthday"]').type('01/01/2001');
      
    });
  
    
  });