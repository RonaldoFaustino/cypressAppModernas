/// <reference types="cypress" />

describe('Test Browser', () => {
    before(() => {
        cy.visit('http://brux0690:8919/SVCv2/login/rede-interna/')
        
        //Validar Pagina
        cy.title()
            .should('be.equal', 'Claro - Portal Unificado de Vendas')
            .and('contain', 'Claro - Portal Unificado de Vendas')
    })

    beforeEach(() => {
        cy.reload()
    })

    // it('Confirmando pagina', () => {
    //     cy.visit('https://wcaquino.me/cypress/componentes.html')
        
    //     cy.title().should('be.equal', 'Campo de Treinamento')
    //     cy.title().should('contain', 'Campo de Treinamento')

    //     cy.title()
    //         .should('be.equal', 'Campo de Treinamento')
    //         .and('contain', 'Campo de Treinamento')
    // })

    // it('Should find and interact with an element',  () => {
    //     cy.visit('https://wcaquino.me/cypress/componentes.html')
    //     cy.get('#buttonSimple')
    //         .click()
    //         .should('have.value', 'Obrigado!')
    // })
    
    // it('Confirmando pagina Spreadup', () => {
    //     cy.visit('https://spreadup.spread.com.br/')
    
    //     cy.title()
    //         .should('be.equal', 'Logon do Changepoint PSA')
    //         .and('contain', 'Logon do Changepoint PSA')
    // })

    it.only('Confirmando pagina SVC', () => {
        //Validar Pagina
        cy.title()
            .should('be.equal', 'Claro - Portal Unificado de Vendas')
            .and('contain', 'Claro - Portal Unificado de Vendas')
        
        //Realizar Login
        cy.get('#username').type('L011Q')
        cy.get('#username').should('have.value', 'L011Q')
        cy.get('#password').type('claro#123')
        cy.get('#password').should('have.value', 'claro#123')
        cy.get('.btn-default').click()
        
        //Loader
        cy.get('.loader > h1').should('have.text', 'Carregando ...')

        //Busca Cliente
        cy.title()
            .should('be.equal', 'Claro - Portal Unificado de Vendas')
            .and('contain', 'Claro - Portal Unificado de Vendas')
        cy.get('input[id="filtro"]')
        .click()
        .type('31322515859')
        cy.get('.md-text-field-divider-container').should('have.value', '313.225.158-59')
        cy.get('.btn-default').click()
        
        //Loader
        cy.get('.loader > h1').should('have.text', 'Carregando ...')

        //Seleção NOVA ATIVAÇAO
        cy.get(':nth-child(5) > .btn-default').click()



    })
    
})