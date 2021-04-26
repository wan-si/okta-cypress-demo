/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }
// cy.screenshot()
const path = require('path');

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
      // The following code comes from https://medium.com/@you54f/configuring-cypress-to-work-with-iframes-cross-origin-sites-afff5efcf61f
      // We were getting cross-origin errors when trying to run the tests.
      if (browser.family === 'chromium' && browser.name !== 'electron') {
          const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');
          launchOptions.args.push(`--load-extension=${ignoreXFrameHeadersExtension}`);
          const accessControlAllowOriginMasterExtension = path.join(__dirname, '../extensions/Access-Control-Allow-Origin-master');
          launchOptions.args.push(`--load-extension=${accessControlAllowOriginMasterExtension}`);
          launchOptions.args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
          launchOptions.args.push('--disable-site-isolation-trials');
          launchOptions.args.push('--reduce-security-for-testing');
          launchOptions.args.push('--out-of-blink-cors');
      }
      if (browser.name === 'electron') {
          launchOptions.preferences.webPreferences.webSecurity = false;
      }
      return launchOptions;
  });

};
