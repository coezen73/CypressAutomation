describe('How to do API tests with cypress', () => {
    it('Simple GET request, check status headers and body', () => {
      cy.request({
        // this function takes a json object as parameter, 
        // and inside this object we define core parts of HTTP request:
        method: 'GET',
        // hardcoded url: https://demoqa.com/BookStore/v1/Books
        url: `${Cypress.env('apiUrl')}${Cypress.env('apiBooks')}`, 
        // Dynamic url: `${Cypress.env('key-variableName')}`

    /*  Other than method and url,  the rest of options depend on your test case.
        For example Cypress automatically fails if the  responce is something other then 
        2XX or 3xx. But sometimes we want to verify if the responce is 4XX(unauthorized):     */
        failOnStatusCode: false,

      }).then((response) => { // Cypress is in JS env. -> No serialisation/deserialisation
        expect(response.status).to.equal(200);
       // cy.log(response); // investigate the cli page->console->click the log and get the info
        // Body, Books Array, Object Headers: Server-Date- Content-Type-Status-Status text....
        //we can have all detailed info by using java script object notation(JSON).

        // Verify second book has title: title Learning JavaScript Design Patterns:
        expect(response.body.books[1].title).to.equal('Learning JavaScript Design Patterns');
        // Verify the header 'connection':
        expect(response.headers.connection).to.equal('keep-alive');
        });
      });
    });
  