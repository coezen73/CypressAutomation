const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.cydeo.com/',
    video:false,                       // <- if we want to record a video-> video:true,
    retries:1,                         // <- if we want to run our testcase 2 times retries:1
    defaultCommandTimeout:5000,       // <- Default it is 4 seconds!
    setupNodeEvents(on, config) {
    // implement node event listeners here
    },
  },
});
