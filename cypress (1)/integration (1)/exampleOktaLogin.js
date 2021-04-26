var OktaAuth = require('@okta/okta-auth-js');
  
  var authClient = new OktaAuth({      
    url: 'https://YOUR_DOMAIN.okta.com',      
    clientId: Cypress.env('client_id'),      
    redirectUri: Cypress.env('testConfig').baseUrl + Cypress.env('redirect_uri')
  });
  
  // Attempt to retrieve ID Token from Token Manager

  const optionsSessionToken = {
    method: 'POST',
    url: Cypress.env('session_token_url'),
    body: {
      username: username,
      password: password,
      options: {
        warnBeforePasswordExpired: 'true'
      }
    }
  }
  var redirect_uri = "" + Cypress.env('testConfig').baseUrl + Cypress.env('redirect_uri');

  cy.log(redirect_uri);

  cy.request(optionsSessionToken).then(response => {
    const sessionToken = response.body.sessionToken;

    authClient.token.getWithoutPrompt({
      sessionToken: sessionToken,
      scopes: [
        'openid',
        'email',
        'profile'
      ],
      state: Cypress.env('state'),
      nonce: Cypress.env('nonce')
    })
      .then(function (res) {
        authClient.tokenManager.add('idToken', res);
      })
      .catch(function (err) {
        // handle OAuthError or AuthSdkError
      });
  })

  cy.visit('/')