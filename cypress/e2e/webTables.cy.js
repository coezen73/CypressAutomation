/// <reference types="cypress" />

/*
   if we need to navigate another URL then our baseUrl, we can define it at this describe block
   (which will affect all 'it' blocks), or in 'it' block
   (which will affect only related 'it' block):
    */
describe('Cypress Web Table Tests', { baseUrl: 'https://demoqa.com' }, () => {
  Cypress.on(
    'uncaught:exception',
    () =>
      // returning false here prevents Cypress from
      // failing the test
      // console.error('uncaught:exception', err)
      false,
  );
  beforeEach('Navigate to Upload Page', () => {
    cy.clearCookies();
    cy.visit('/webtables');
  });
  xit('Finding and editing a record', () => {
    /* Locate table-body -> navigate through this element to find 'Alden Cantrell', 
           -> update info with another person:  
           1. get me table body  
           2. get me the row that contains 'Alden'
           3. store it as Jquery element
           */
    cy.get('.rt-tbody') // <- class element (the whole table)
      .contains('.rt-tr-group', 'Alden') // <- parent to child element
      .then((row) => {
        // <- create a row element in Jquery
        cy.wrap(row) // <- turn it to a cypress element
          .find('[title="Edit"]')
          .click(); // <- click the edit icon on the row
        // fill out the box with a new person:
        cy.get('#firstName').clear().type('Max');
        cy.get('#lastName').clear().type('Mustermann');
        cy.get('#userEmail').clear().type('mmuster@mustermail.de');
        cy.get('#age').clear().type('40');
        cy.get('#salary').clear().type('5000');
        cy.get('#department').clear().type('QA');
        cy.get('#submit').click();
        // We are still inside the row element, we still need to do an Assertion:
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Mustermann');
      });
  });
  it('Finding and deleting a record', () => {
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden')
      .then((row) => {
        // click on Delete button for Alden record
        cy.wrap(row).find('[title="Delete"]').click();
      });
    // Assert that table does NOT have Alden record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // search for Alden in the body
    cy.get('#searchBox').type('Alden');
    // Assert that there is no record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // No data found element is visible or not
    cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
  });
  it('Searching for different age records', () => {
    // define age groups (create an array)
    const ageGroup = [29, 39, 45, 77]; // 3 positive scenario numbers, one negative (77)
    // for each age group, perform same test scenario: (DDT)
    cy.wrap(ageGroup).each((age) => {
      // we are again wrapping JS objects to cypress
      // type age into search box
      cy.get('#searchBox').clear().type(age);
      // verify if that age exists, second number of records
      if (age === 77) {
        // negative scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      } else {
        // positive scenario
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
        cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
      }
    });
  });
});
