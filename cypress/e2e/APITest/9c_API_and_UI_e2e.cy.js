// To create a user in 'demoqa' in randomly ->
// Generate 5 digit random number after'user':
const username = `user${Math.floor(Math.random() * 100000 + 100000).toString().substring(1)}`;
const password = 'Test123456!';   // <- Hard coded- no need to make it dynamic

describe('E2E - Test API integrated UI Test', () => {

// TO CREATE WE USE BEFORE-EACH BLOCK:

  beforeEach('create USER, generate TOKEN from API, and set COOKIES', () => {
    // API - POST request for creating user and setting cookies for the test:
    // we use Swagger -defined CRUD paths & paths r defined in cypress.config
    cy.request({
      method: 'POST',
      url:`${Cypress.env('apiUrl')}${Cypress.env('generateUser')}`,  
      body: {   // here we have body to create user:
        userName: username, 
        password: password
      }
    }).then((response) => {   // I take the response which provides me a body
      cy.setCookie('userID', response.body.userID);  // store(set) them into cookies in Cypress UI env.
      cy.setCookie('userName', response.body.username);
    });
    // The Following will generate token, and set token cookie:
    cy.request({
      method: 'POST' ,
      // Need to use our'generate token url' which we find it in swagger doc.: 
      url:`${Cypress.env('apiUrl')}${Cypress.env('generateToken')}`,
      // To generate token username and password have sent:
      body: {   
        userName: username,
        password: password
      }
    }).then((response) => {
      cy.setCookie('token', response.body.token);
      // we need to set 'expires' as a variable:
      cy.setCookie('expires', response.body.expires); // comes from response body
    });
  });
  
  // ---------------------------------------------------------------------------------

  // TO DELETE, WE USE AFTER-EACH BLOCK:

  afterEach('Delete USER which created for testing by using API-request', ()=> {
    // we r chainning API requests to 'login' first and then to delete
    // Login request:
    cy.request({
      method:'POST',
      url:`${Cypress.env('apiUrl')}${Cypress.env('loginAPI')}`,
      // in order to login we need to use body again:
      body: {
        userName: username,
        password: password
      }
    }).then((response) => {
      cy.request({
        method: 'DELETE',
      // In order to delete, we need to provide some headers:
      // and also we need to have Authorization.
      // We use token inside our header authorization
        headers: {
          authorization:`Bearer ${response.body.token}`
        },
        url:`${Cypress.env('apiUrl')}${Cypress.env('generateUser')}/${response.body.userId}`
        });  
      });
    });
 
   // --------------------------------------------------------------------------------

    // NOW, OUR TEST:
    
    it('CHECK if the user is logged-in with API request from UI environment',
      {baseUrl:'https://demoqa.com'}, () => {
      // to check that we need to visit UI part:
      cy.visit('/profile');
      cy.get('#userName-value').contains(username).should('be.visible');

  });
});