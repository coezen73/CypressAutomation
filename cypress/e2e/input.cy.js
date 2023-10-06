/// <reference types="cypress" />

describe('Input Forms in Tests', () => {
  beforeEach('Navigate to Registration Page', () => {
    // runs before each test case
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it('Check different input box fields and verify', () => {
    // fill the form:
    cy.get('input[name="firstname"]').type('Max');
    cy.get('input[name="lastname"]').type('Mustermann');
    cy.get('input[name="username"]').type('Max2001');

    /*  Math.floor : makes it a whole number  
        Math.random(): creates a number between 0 - 1 ~ 0.005678     */
    //Mail:
    const email = `testmail${Math.floor(100000 + Math.random() * 900000)}@mail.com`;
    cy.get('input[name="email"]').type(email);
    // password:
    const password = `test${Math.floor(100000 + Math.random() * 900000)}`;
    cy.get('input[name="password"]').type(password);
    // phoneNumber: (4 digit extension number)
    const phoneNumber = `555-000-${Math.floor(1000 + Math.random() * 9000)}`; 
    cy.get('input[name="phone"]').type(phoneNumber);

    cy.get('input[name="birthday"]').type('01/01/2001');
  });
  it('Check different radio-button actions',() => {
    cy.get('.radio')            // <- Locate all the buttons at once (.radio) from the class,
    .find('[type=radio]')       // <- locate the button itself,
    .then(($myRadio =>{         // <- $myRadio : Jquery element / new function($myRadio),

    cy.wrap($myRadio).first().check().should('be.checked'); // <- cypress chainable structure  
  /* convert to cypress object(wrap) and get all radio buttons -> and select the first one,
     -> assert if it is checked.-> should()verifies what ever I provide as parameter 
     'be.checked' (cypress func.)  */
    }))                                                

  })
});
