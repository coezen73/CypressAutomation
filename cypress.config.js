const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.cydeo.com/',
    video:false,         
    // if we want to record a video-> video:true,
    retries:2,
    // if we want to run our testcase 3 times retries:2
    setupNodeEvents(on, config) {
    // implement node event listeners here
    },
  },
});
