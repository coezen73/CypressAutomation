/// <reference types="cypress" />
describe('Button Actions' , () => {

    beforeEach (() => {
        // runs before each test case;
        cy.clearCookies();
        cy.visit('/multiple_buttons');

    })

    it('Check Different Button Actions', ()=> {
    // Select button with a text: 
        cy.contains('Button 2').should('be.visible').click();
    //    (locating)     -     (verifying)     -     (acting)
       
        
    /* TASK: Find element with 'class' attribute and create a list
             Then select 3rd element from the list   */

        cy.get('.btn.btn-primary').then(($buttons) => { //<-I created a list, and named as 'buttons'
           cy.wrap($buttons).eq(2).click();      // <- In order to turn that list into cypress element,
                                                 //  I use wrap command. eq(2)-> it is a list(3rd button)
           cy.contains('Clicked on button three!').should('be.visible');    
        })     
   
     }) 
   })
