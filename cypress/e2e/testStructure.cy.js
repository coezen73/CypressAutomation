/// <reference types="cypress" />

describe('Context: My First Tests', () => {
  before(() => {
    // Runs before all test cases in this describe block, like before class in TestNG
  });

  beforeEach(() => {
    // runs before each test case, beforeMethod in TestNg;
    cy.clearCookies();
  });

  after(() => {
    // similar to after class in TestN´G, ruuns once after all tests finished
  });
  afterEach(() => {
    // runs after  each test case, afterMethod in TestNg;
  });

  it('Opens a web application', () => {
    cy.visit('/registration_form');
    cy.get(':nth-child(1) > label > input').click();
  });

  it.skip('Test 2: verifying the statements', () => {
    expect(false).to.equal(false); // <- One element to be equal to smt else (elements,texts, numbers, etc..).
  });

  it('Test 3: verifying the statements', () => {
    expect(false).not.to.equal(true); // <- One element NOT to be equal to smt else (elements,texts, numbers, etc..).
  });

  it('Test 4: verifying the statements', () => {
    expect(5).to.equal(5);
  });

  xit('Test 5: verifying the statements', () => {
    expect(5).not.to.equal(5 == '5');
  });
  // we can use ".only" to run only the choosen test case
});
