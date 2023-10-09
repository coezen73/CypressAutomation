// <reference types="cypress" />

describe('Cypress File Upload Tests', () => {
/*
Step1- In order to upload files in Cypress, we need to install plugin.
       We will run following command in Terminal: npm install -dev cypress-file-upload 
Step2- We need to import necessary command into our support folder, commands.js file:
       import 'cypress-file-upload';
       (This file is also suitable for our utility-functions to place in.)
Step3- The File that we want to upload, should be in our fixture folder(pic.png):
*/   

    beforeEach('Navigate to Upload Page', () => {
      cy.clearCookies();
      cy.visit('/upload'); //<- we already defined our base url.(this is the extension)
    });
    it('Check Upload Action', () => {
      // locate choose file button and attach a file:
      cy.get('input#file-upload').attachFile('pic.png');
      // click on upload button: 
      cy.get('input#file-submit').click();
      // assert path message displayed:
      // I locate it, than I use this object to verify->
      cy.get('#uploaded-files').then(() => { 
         cy.contains('pic.png').should('be.visible'); 

      });
    });

});
  
   

  