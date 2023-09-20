/// <reference types="cypress" />

describe('Context: My First Tests' , () => {

    before(() => {

      // Runs before all test cases in this describe block, like before class in TestNG  

    })

    beforeEach (() => {

        // runs before each test case, beforeMethod in TestNg;
        cy.clearCookies();

    })

    after(() => {

        // similar to after class in TestN´G, ruuns once after all tests finished
    })
    afterEach(() => {

         // runs after  each test case, afterMethod in TestNg; 
    })

    it('Opens a web application', ()=> {

        cy.visit('/registration_form');
    

    })

})