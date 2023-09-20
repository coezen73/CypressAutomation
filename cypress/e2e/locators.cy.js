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
           - Cypress accept only CSS locators.(No XPath.)*/

      // My command created an object(input), which is a list actually (has more than 1 element).
      //From the Library I can get the item index and list to make a verification: 
       
    cy.get("input").each((item, index, list) =>{
        expect(item).to.have.attr("type");
        // assert the list lenghts is 2:
        expect(list).to.have.length(2);
        
       })
    })   

})