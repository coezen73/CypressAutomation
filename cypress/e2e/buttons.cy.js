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
        // you got all buttons with tagName
        cy.get('button').each((item, index, list) => {
            //assert length of the list, verify number of buttons:
            expect(list).to.have.length(6);
            expect(list).to.have.attr('onclick');
        })
        /*I will get all buttons again, but this time I will get only the item and
       check for the text of each item. When the item is equal to button 4, I will click. */
       cy.get('button').each((item) => {
        if(item.text()=="Button 4"){
            cy.log(item.text());   // <- log function writes the text at the test console
           // item.click(); <- we can't use cypress click function with JQuery(item) element
           // we need to use 'wrap' function to convert:
           cy.wrap(item).click();
           cy.contains('Clicked on button four!').should('be.visible');
        }
       
    })

     }) 


   })
