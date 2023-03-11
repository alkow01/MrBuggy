const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    'baseUrl': "http://demo-sii.mrbuggy2.testarena.pl/",
    "includeShadowDom": true,
    "chromeWebSecurity": true,
    "viewportHeight": 1080,
    "viewportWidth": 1920,

}
});

