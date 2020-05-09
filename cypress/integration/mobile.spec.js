/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('http://BRUX0802:20120/docroot/login/login.jsp')
    })

    beforeEach(() => {
        cy.reload()
    }) 
    
    it('Login Mbobile', () => {
        cy.get('input[name="user"]')
            .type('60001')
            .should('have.value', '60001')
        cy.get('input[name="password"]')
            .type('unix22')
            .should('have.value', 'unix22')
        cy.get('input[type="submit"]')
           .click()

       // Pesquisar por MSisdn
        cy.get(':nth-child(1) > .bgTable > table > tbody > :nth-child(2) > .folderFieldTitle > input')
            .should('be.checked')
        cy.get(':nth-child(1) > .bgTable > table > tbody > :nth-child(2) > .fieldText > .formInputCombo')
            .select('MSISDN')
            .should('have.value', 'RES_C')    
        cy.get(':nth-child(1) > .bgTable > table > tbody > :nth-child(3) > .fieldText')
            .type('11932331823')
        cy.get('input[name="imageField"]')
            .click()
        // Validar Campos Resultados da Pesquisa
        cy.get('[cellpadding="3"] > :nth-child(1) > [valign="top"] > :nth-child(1)')
        cy.get('[title="TESTE ATIV PRE "]')
                    // 11932331823
    })

})