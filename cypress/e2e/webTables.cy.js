/// <reference types="cypress" />

   /*
   if we need to navigate another URL then our baseUrl, we can define it at this describe block
   (which will affect all 'it' blocks), or in 'it' block
   (which will affect only related 'it' block):
    */ 
describe('Cypress Web Table Tests', {baseUrl:'https://demoqa.com'} , () => {
   
    Cypress.on('uncaught:exception', () => {
        // returning false here prevents Cypress from
        // failing the test
        // console.error('uncaught:exception', err)
        return false;
      });
        beforeEach('Navigate to Upload Page', () => {
          cy.clearCookies();
          cy.visit('/webtables'); 
        });
        it('Check finding and editing a record', () => {
        /* Locate table-body -> navigate through this element to find 'Alden Cantrell', 
           -> update info with another person:  
           1. get me table body  
           2. get me the row that contains 'Alden'
           3. store it as Jquery element
           */
        cy.get('.rt-tbody')                     // <- class element (the whole table)
        .contains('.rt-tr-group','Alden')       // <- parent to child element
        .then((row) => {                        // <- create a row element in Jquery
          cy.wrap(row)                          // <- turn it to a cypress element 
          .find('[title="Edit"]').click();      // <- click the edit icon on the row
        // fill out the box with a new person:
          cy.get('#firstName').clear().type('Max');
          cy.get('#lastName').clear().type('Mustermann'); 
          cy.get('#userEmail').clear().type('mmuster@mustermail.de');
          cy.get('#age').clear().type('40');
          cy.get('#salary').clear().type('5000');
          cy.get('#department').clear().type('QA');
          cy.get('#submit').click();
         // We are still inside the row element, we still need to do an Assertion:
         cy.wrap(row).find('.rt-td').eq(1).should('contain','Mustermann');


    })
          });
        });
    
 
      