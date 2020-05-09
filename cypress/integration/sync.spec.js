/// <reference types="cypress" />


describe('Espera...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    }) 

    it('Deve Aguardar Elemento estar disponivel', () => {
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')
            .should('exist')
        cy.get('#novoCampo')
            .type('funciona')
    })

    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')
            .should('exist')
        cy.get('#novoCampo')
            .type('funciona')
    })

    it('Uso do Find', () => {
        cy.get('#buttonListDOM')
            .click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        // cy.get('#lista li')
        //     .finf('span')
        //     .should('contain', 'item 2')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay')
        //     .click()
        // // cy.get('#novoCampo', { timeout: 1000})  //utilizando timeout direto
        // cy.get('#novoCampo')
        //     .should('exist')

        // cy.get('#buttonListDOM')
        //     .click()
        // cy.wait(5000) //
        // cy.get('#lista li span')
        //     .should('contain', 'item 2')

        cy.get('#buttonListDOM')
            .click()
        cy.get('#lista li span', {timeout: 30000})
            .should('have.length', 2)
    })

    it('Click Retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    it('Should vs Then', () => {
        cy.get('#buttonListDOM')
            // .click()
        // cy.get('#lista li span')
            .then($el => {
                expect($el).to.have.length(1)
                return 2
            }).and('eq', 2)
              .and('not.have.id', 'buttonListDOM')
            // .debug()
            // .should('have.length', 1)
    })

    it.only('Should vs Then 2', () => {
        cy.get('#buttonListDOM')
            .then($el => {
                expect($el).to.have.length(1)
        cy.get('#buttonLinst')
            })
    })
})