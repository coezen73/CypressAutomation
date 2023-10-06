/// <reference types="cypress" />

describe('Input Forms in Tests', () => {
  beforeEach('Navigate to Registration Page', () => {
    // runs before each test case
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it.skip('Check different input box fields and verify', () => {
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
  it.skip('Check different radio-button actions',() => {
    cy.get('.radio')            // <- Locate all the buttons at once (.radio) from the class,
    .find('[type=radio]')       // <- locate the button itself,
    .then(($myRadio =>{         // <- $myRadio : Jquery element / new function($myRadio),
  // Get all radio buttons, select the first one and verify that it is checked:
    cy.wrap($myRadio).first().check().should('be.checked'); // <- cypress chainable structure  
  /* convert to cypress object(wrap) and get all radio buttons -> and select the first one,
     -> assert if it is checked.-> should()verifies what ever I provide as parameter 
     'be.checked' (cypress func.)  */

  // Get all radio buttons, select the second one and verify that it is checked:
  cy.wrap($myRadio).eq(1).check().should('be.checked');
  cy.get('[data-bv-icon-for="gender"]').should('be.visible');
  // Third radio button is NOT checked:
  cy.wrap($myRadio).eq(2).should('not.be.checked');

    }))                                                

  })
  it.skip('Check different checkbox actions', () => {
    // Get all checkboxes and select JAVA:
   cy.get('[type="checkbox"]').then(($myCheckbox) => {
      cy.wrap($myCheckbox).eq(1).check().should('be.checked');
      // Unchecked JAVA:
      cy.wrap($myCheckbox).eq(1).uncheck().should('not.be.checked');
      // Verify and check if the third checkbox has the value of 'javascript'
      cy.wrap($myCheckbox).eq(2)
      .should('have.value', 'javascript')
      .check().should('be.checked');

      


   }) 


  })
  it.skip('Check selection of a single choice from dropdown' , () => {
    // select one element:
   cy.get('select[name="job_title"]').select("QA"); // <- select 'class' and select 'function' 
    // assert the text after selecting:
   cy.get('select[name="job_title"]').contains("QA");

  })

  it('Check selection of all list options', () => {
    //  We will provide our test data through 'fixtures' folder as JSON object,
    //  then we use the data to verify selected values.
    cy.fixture('departments').then((departments) => {
      // Get all options in dropdown, iterate through these options one by one:
      cy.get('select[name="department"] > option').each((option,index) => {
        // get each option text:
        const opText = option.text(); // <- I create an 'opText' variable to hold the text by using text()function
       // cy.log(opText);
       // cy.log(index);
       // cy.log(departments[index]);
       cy.get('select[name="department"]').select(opText)
       .should('have.value', option.val())
       .contains(departments[index]);

      })
    })

  })
});
