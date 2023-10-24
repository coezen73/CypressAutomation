/// <reference types="cypress" />

describe('Alerts in Cypress', { baseUrl: 'https://demoqa.com' }, () => {
  Cypress.on(
    'uncaught:exception',
    () =>
      // returning false here prevents Cypress from
      // failing the test
      // console.error('uncaught:exception', err)
      false,
  );

  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/alerts');
  });

  it('Alerts Confirmation', () => {
    // Browser Commands, window:alert, window:confirm, window:on ...etc.

    const stub = cy.stub(); // First, create stub  function before clicking the confirm button(alert)

    cy.on('window:confirm', stub); // <- when this confirmation command initiate,
    //  it stores and give the control to stub function.
    cy.get('#confirmButton')
      .click()
      .then(() => {
        // Getting and verifying the name of the alert:
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });
    // Accepting the alert.(clicking on the OK button):
    cy.on('window:confirm', () => true);
    cy.contains('You selected Ok').should('be.visible');
  });

  it('Alerts Cansellation', () => {
    // Browser Commands, window:alert, window:confirm, window:on ...etc.

    const stub = cy.stub(); // First, create stub  function before clicking the confirm button(alert)

    cy.on('window:confirm', stub); // <- when this confirmation command initiate,
    //  it stores and give the control to stub function.
    cy.get('#confirmButton')
      .click()
      .then(() => {
        // Getting and verifying the name of the alert:
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });
    // Cancelling the alert confirmation
    cy.on('window:confirm', () => false);
    cy.contains('You selected Cancel').should('be.visible');
  });
});
