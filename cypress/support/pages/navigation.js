// This time export directly :
export class NavigateTo {
  loginPage() {
    cy.visit(Cypress.env('login')); // .env():Gets the parameters, inside the paranthesis
  }
}
/* in order to be sure that login page is cydeo's login page, but not others; 
 we can use cypress.config.js file for setting up our test environment.
 (have a look cypress.config.js )
 - Here, I create and export it at the same time: */
export const navigateTo = new NavigateTo();
