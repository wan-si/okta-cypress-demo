// / <reference types="Cypress" />

describe('add account', function(){

    before(()=>{
        cy.signIn()

    })
    beforeEach(()=>{
        Cypress.Cookies.preserveOnce('AWSALB','rack.session')
        })
    var testRunTime = new Date()
    const nameSufix = testRunTime.getFullYear() + (testRunTime.getMonth() + 1) + testRunTime.getDate()
        + "T" + testRunTime.getHours() + testRunTime.getMinutes() + testRunTime.getSeconds();


    context('when input valid account info', function () {
        it('should successfully to add an account', () => {
            cy.log("Start to add account")
            cy.get('#spec-add-account').click()
            cy.url().should('include', 'account/create/to-account-detail')
            cy.get('#new-account-name').type(newAccount.AccountName)
            cy.get('#new-account-industry').select(newAccount.Industry)
            cy.xpath('//custom_select[@id="booked-sales-target-year"]/div[1]/input').click()
            cy.xpath('//custom_select[@id="booked-sales-target-year"]/div[1]/ul/li[2]').click()
            cy.xpath('//input[contains(@data-bind,"monetaryValue: booked_sales_target_value")]').type(newAccount.BookedSalesTarget)
            cy.contains('SAVE').click()
            cy.url().should('include', '/account-details');
            cy.log("Add account successfully");
            // cy.contains(newAccount.AccountName)
        });

    });

    context('when input invalid account info', function () {
        it('should not pass account duplicate validation when input an exsited account name', function () {
            cy.get(addAccountPageElement.addAccountLink)
                .click()
            cy.url().should('include', addAccountPageElement.addAccountPageURL);
            cy.get(addAccountPageElement.accountName)
                .type(newAccount.AccountName)
            cy.get(addAccountPageElement.accountExsitedValidationMsg)
                .should('eq', validationMsg.exsitedAccount);

        });
        it('should show the similar validation when input an similar account name', function () {
            cy.get(addAccountPageElement.addAccountLink)
                .click()
            cy.url().should('include', addAccountPageElement.addAccountPageURL)
            cy.get(addAccountPageElement.accountName)
                .type(newAccount.AccountName.slice(0, -2))
            cy.get(addAccountPageElement.accountSimilarValidationMsg)
                .should('eq', validationMsg.similarAccount)

        });
    });
})
