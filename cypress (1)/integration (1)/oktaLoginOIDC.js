
import { OktaAuth } from '@okta/okta-auth-js'

Cypress.Commands.add('newOktaLogin', () => {


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

    const authClient = new OktaAuth({
        issuer: Cypress.env('callBack_url'),
        clientId: Cypress.env('client_id'),
        redirectUri: Cypress.env('redirect_uri'),
        tokenManager: {
            storage: 'cookie'
        },
        cookies: {
            secure: false
        }
    })
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

            const urlWithToken = response.headers.location.toString();
            const accessToken = urlWithToken
                .substring(urlWithToken.indexOf('fromLoginToken'))
                .split('=')[1];

            authClient.token.getWithoutPrompt({
                accessToken:acessToken
            }).then(()=>{
                authClient.tokenManager.add('accessToken', accessToken);
            })
            cy.visit(Cypress.env('callBack_url'))



        })
    });
});