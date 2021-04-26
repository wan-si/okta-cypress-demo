Cypress.Commands.add('oktaLogin', () => {
    const optionsStateToken = {
        method: 'POST',
        url: Cypress.env('state_token_url'),
        body: {
            username: Cypress.env('username'),
            password: Cypress.env('password'),
            options: {
                warnBeforePasswordExpired: 'true',
                multiOptionalFactorEnroll: 'true'
            }
        }
    };

    cy.request(optionsStateToken).then(response => {
        const stateToken = response.body.stateToken;

        const optionsSessionToken = {

            method: 'POST',
            url: Cypress.env('verify_url'),
            headers: {
                orgin: Cypress.env('baseUrl')
            },
            body: {
                answer: Cypress.env('securityAnswer'),
                stateToken: stateToken
            }
        }

        cy.request(optionsSessionToken).then(response => {

            const sessionToken = response.body.sessionToken;
            const qs = {
                checkAccountSetupComplete:true,
                token: sessionToken,
                redirectUrl: Cypress.env('redirect_uri'),
            }

            cy.request({
                method: 'GET',
                url: Cypress.env('auth_token_url'),
                form: true,
                followRedirect: true,
                qs: qs
            }).then(() => {
                // const urlWithToken = response.headers.location.toString();

                // const accessToken = urlWithToken
                //   .substring(urlWithToken.indexOf('fromLoginToken'))
                //   .split('=')[1];

                cy.visit('/')

            });
        });
    });
})