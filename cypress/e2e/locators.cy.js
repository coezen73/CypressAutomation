/// <reference types="cypress" />

describe('Find or Get Elements by Using Different Locators' , () => {

    beforeEach (() => {
        // runs before each test case;
        cy.clearCookies();
        cy.visit('/login');

    })

    it('Check different Locator approaches', ()=> {

    // By CSS Locator:-> Attribute: name and value:
    cy.get("input[name='username']").type("CemilOezen");
 
    cy.get("input[type='text']").clear(); // clear what is typed first 

    /* NOTE: Every statement creates an object to be interacted, 
           - Cypress accept only CSS locators.(No XPath.)

      -  My command created an object(input), which is a list actually (has more than 1 element).
      -  From the Library I can get the item index and list to make a verification: */

      // by tagName:
    cy.get("input").each((item, index, list) =>{
        expect(item).to.have.attr("type");
        // assert the list lenghts is 2:
        expect(list).to.have.length(2);    
       })
      // by attributeName:
    cy.get('[type]');
      // by className:
      cy.get('.btn.btn-primary');
      /* we place '.' at the beginning and if there's a space in between 
      we put another '.' and clear the space --> 'btn btn-primary': '.btn.btn-primary' */
      
      // by id:
    cy.get('#wooden_spoon');

      // If I want to use text--> no xpath bur possible with different approach:
        //  There is a way of chainning..
    cy.get('button').should('contain', 'Login').click();


    })      


})