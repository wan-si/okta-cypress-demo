/// <reference types="cypress" />

Cypress.Commands.add('signIn',()=>{
    cy.log("Start to login")
    cy.visit('/')
    cy.wait(10)
    cy.contains('username')
    cy.get('input[id="okta-signin-username"]')
        .type(Cypress.env('username'))

    cy.get('input[id="okta-signin-password"]')
        .type(Cypress.env('password'))

    cy.get('input[id="okta-signin-submit"]').click()
    
    // cy.url().should('include','/verify/okta/question')
    // cy.contains('Security Question')
    
    cy.get('input[name="answer"]')
    .type(Cypress.env('securityAnswer'))
    try {
        cy.get('input[class="button button-primary"]')
        .click()
        .then(()=>{
            cy.wait(500)
            cy.getCookie('rack.session')
        })
    } catch (error) {
        console.log(error)
    }

})