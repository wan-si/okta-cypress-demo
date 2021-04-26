describe('add staffing request', ()=> {

    before(()=>{
        cy.oktaLogin();
    })

    it('addd staffing to the opportunity', () =>{
        
        cy.get('.input-group #spec-find-opportunity-text-box')
            .type('Sales System Team - TM')
        
        cy.get('#search-accounts-and-opportunities-wrapper')
            .should('be.visible')
            .as('searchResult')
        cy.get('@searchResult')
            .find('[data-bind="foreach: opportunitiesDisplay"]')
            .find('li:first').click()
        cy.log('click staffing tab')
        cy.contains('STAFFING')
            .click()
        cy.contains('ADD ROLES')
            .click()
        
        cy.get('#working-offices')
            .select('Barcelona')
        cy.log('Add the role in first line')
        cy.get('[data-bind = "foreach: rolesToSaveNewUI"]')
            .find('select:first')
            .select('Developer')
        cy.get('[data-bind = "foreach: rolesToSaveNewUI"]')
            .find('select')
            .eq(1)
            .select('Senior Consultant')
        cy.get('input[data-bind~="numeric: count"]')
            .eq(0)
            .type('20')
        cy.log('Add the role in fifth line')
        cy.contains('a','Add New Role').click()
        cy.get('[data-bind = "foreach: rolesToSaveNewUI"]')
            .find('select')
            .eq(8)
            .select('IT Infrastructure Domain Specialist')
        cy.get('[data-bind = "foreach: rolesToSaveNewUI"]')
            .find('select')
            .eq(9)
            .select('Senior Consultant')
        cy.get('input[data-bind~="numeric: count"]')
            .eq(4)
            .type('30')
        cy.get('button[type = "submit"]').click()
    }) 
}

)