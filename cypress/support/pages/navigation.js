 // This time export directly :
 export class navigateTo{
    loginPage() {
       cypress.visit(Cypress.env('login')); 
    }
 }

 /* in order to be sure that login page is cydeo's login page, but not others; 
 we can use cypress.config.js file for setting up our test environment.
 (have a look cypress.config.js )
 
 - Here, I create and export it at the same time: */

 export const navigateTo = new navigateTo();
