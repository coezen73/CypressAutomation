const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.cydeo.com/',
    env:{
      login:"/login",
      apiUrl:"https://demoqa.com",
      apiBooks:"/BookStore/v1/Books", 
      generateUser:"/Account/v1/User",
      generateToken:"/Account/v1/GenerateToken",
      loginAPI:"/Account/v1/Login"

    },
    video:false,                       // <- if we want to record a video-> video:true,
    retries:1,                         // <- if we want to run our testcase 2 times retries:1
    defaultCommandTimeout:5000,       // <- Default it is 4 seconds!
    viewportHeight: 800,              // <- We can change the size of the viewport in CLI 
    viewportWidth: 1200,
    setupNodeEvents(on, config) {
    // implement node event listeners here
    },
  },
});
