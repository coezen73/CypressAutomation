/// <reference types="cypress" />

describe('Spartan API tests', { baseUrl:'http://54.226.211.37:8000/' }, () => {
  xit('Get a single spartan', () => {
    cy.request('GET', 'api/spartans/').then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal('Terence');
    });
  });
});
