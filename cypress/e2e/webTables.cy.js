/// <reference types="cypress" />

/*
   if we need to navigate another URL then our baseUrl, we can define it at this 'describe' block
   (which will affect all 'it' blocks), or in 'it' block
   (which will affect only related 'it' block):
    */
describe('CYPRESS WEB-TABLES TESTS', { baseUrl: 'https://demoqa.com' }, () => {
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

  it('Finding And Editing a Record', () => {
    /* Locate table-body -> navigate through this element to find 'Alden Cantrell', 
       -> update info with another person:  
           1. get me table body  
           2. get me the row that contains 'Alden'
           3. store it as Jquery element
           */
    cy.get('.rt-tbody') // <- class element (the whole table)
      .contains('.rt-tr-group', 'Alden') // <- parent to child element
      .then((row) => {  // <- create a row element in Jquery
        cy.wrap(row)    // <- turn it to a cypress element
          .find('[title="Edit"]')
          .click();    // <- click the edit icon on the row
        // fill out the box with a new person:
        cy.get('#firstName').clear().type('Max');
        cy.get('#lastName').clear().type('Mustermann');
        cy.get('#userEmail').clear().type('mmuster@mustermail.de');
        cy.get('#age').clear().type('40');
        cy.get('#salary').clear().type('5000');
        cy.get('#department').clear().type('QA');
        cy.get('#submit').click();
        // We are still inside the row element, we still need to do an Assertion:
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Max');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Mustermann');
      });
  });

  it('Finding And Deleting a Record', () => {
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
    // 'No rows found' element is visible or not
    cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
  });

  it('Searching for Different Age Records', () => {
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

  it('Adding New Record - BAD CODING Practice', () => {
    cy.get('#addNewRecordButton').click();
    // Fill out the form:
    cy.get('#firstName').type('Max');
    cy.get('#lastName').type('Mustermann');
    cy.get('#userEmail').type('muster@mustermail.de');
    cy.get('#age').type('40');
    cy.get('#salary').type('7000');
    cy.get('#department').type('QA');
    cy.get('#submit').click();
    // Assert that the new record is added:
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Mustermann')
      .then((row) => {
        // JS to cypress:
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Max'); // Cypress assertion functions
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Mustermann');
        cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'muster@mustermail.de');
        cy.wrap(row).find('.rt-td').eq(4).should('contain', '7000');
        cy.wrap(row).find('.rt-td').eq(5).should('contain', 'QA');
      });
  });

  it('Adding New Record - BETTER APPROACH Practice', () => {
    // click on add button:
    cy.get('#addNewRecordButton').click();
    // Instead of adding one by one in a hard coded way,
    // we call it from json file, which I created and named it as '{}user.json' and loop them;
    cy.fixture('user').then((user) => { // Grab the json file from fixtures folder,
      //  Put the columns in an array first:
      const columnNames = Object.keys(user.user1); // <- Get 'user1'-object keys from fixtures folder and store them.
      const userData = Object.values(user.user1); // <-  "          "        values       "         "           "
      // Now create a loop:
      cy.wrap(columnNames).each((columnName, index1) => {
        cy.log(columnName);      // firstName, lastName...
        cy.log(userData[index1]); // (Array) Max, Mustermann ...
      /* Now we go with each element with a loop:
      Use String concatenation(backtick- ``) / use '$' and '{}' to insert variable */
      cy.get(`#${columnName}`).type(`${userData[index1]}`) 
      });
      cy.get('#submit').click();
      // Assert that new records added:
      cy.get('.rt-tbody')
      .contains('.rt-tr-group', userData[0])
      .then((row) => { 
        cy.wrap(userData).each((value,index) =>{
          cy.wrap(row).find('.rt-td').eq(index).should('contain', value); 
        });        
      });
    });
  });

  it('Adding New Record with Better Approach2', () => {
    cy.get('#addNewRecordButton').click(); 
    cy.fixture('user').then((user) => {
      const columnNames2 = Object.keys(user.user2);
      const userData2 = Object.values(user.user2);
    cy.wrap(columnNames2).each((columnName2, index2) => {
      cy.get(`#${columnName2}`).type(`${userData2[index2]}`)
    }); 
    cy.get('#submit').click();
    // Assert that new records added:
    cy.get('.rt-tbody')
    .contains('.rt-tr-group', userData2[0])
    .then((row) => { 
      cy.wrap(userData2).each((value,index) =>{
        cy.wrap(row).find('.rt-td').eq(index).should('contain', value); 
      });        
    });
  });

});
});
