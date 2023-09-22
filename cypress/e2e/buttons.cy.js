/// <reference types="cypress" />
describe('Find or Get Elements by Using Different Locators' , () => {

    beforeEach (() => {
        // runs before each test case;
        cy.clearCookies();
        cy.visit('/multiple_buttons');

    })

    it('Check Different Button Actions', ()=> {
    // Select button with a text: 
        cy.contains('Button 2').should('be.visible').click();
   //     (locating)     -     (verifying)     -     (acting)
        cy.contains('Clicked on button two!').should('be.visible');
 
   
     }) 
   })
