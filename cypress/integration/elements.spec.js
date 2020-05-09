/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    }) 
    
    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        // cy.get('body').should('have.text', 'Cuidade')
        cy.get('span').should('contain', 'Cuidado')
        // cy.get('div').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
    })

    it('TextFild', () => {
        cy.get('#formNome').type('Cypress test')
        cy.get('#formNome').should('have.value', 'Cypress test')

        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')
        
        cy.get('#tabelaUsuarios > tbody > tr:nth-child(1) > td:nth-child(6) > input[type=text]')
            .type('teste')
            .should('have.value', 'teste')
        
        cy.get('#formSobrenome')
            .type('Testando Cypres12345{backspace}{backspace}')
            .should('have.value', 'Testando Cypres123')
        
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}Acerto', {delay:100})
            .should('have.value', 'Acerto')
    })

    it('Radio Button', () => {
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked')
        cy.get('#formSexoFem')
            .should('not.be.checked')

        cy.get("[name='formSexo']")
            .should('have.length', 2)

    })

    it('Checkbox', () => {
        cy.get('#formComidaFrango')
            .click()
            .should('be.checked')
        cy.get('#formComidaCarne')
            .should('not.be.checked')
        cy.get("[name='formSexo']")
            .should('have.length', 2)
        cy.get('[name=formComidaFavorita]')
            .click({multiple: true})
        cy.get('#formComifaPizza')
            .should('not.be.checked')
        cy.get('#formComidaVegetariana')
            .should('be.checked')
    })

    it('Combo', () => {
        cy.get('#formEscolaridade')
            .select('2o grau incompleto')
            .should('have.value', '2grauincomp')
        cy.get('#formEscolaridade')
            .select('especializacao')
            .should('have.value', 'especializacao')

        cy.get('[id="formEscolaridade"] option')
            .should('have.length' , 8)
        cy.get('[id="formEscolaridade"] option')
            .then($arr => {
                const values = []
                $arr.each(function () {
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(["Superior", "Mestrado"])
            })
    })

    it.only('Combo Multiplo', () => {
        cy.get('[data-testid="dataEsportes"]')
            .select(['natacao', 'Corrida', 'nada'])
        // cy.get('[data-testid="dataEsportes"]').should('have.value', ['natacao', 'Corrida', 'nada'])
        cy.get('[data-testid="dataEsportes"]')
            .then($el => {
                expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
                expect($el.val()).to.have.length(3)
            })

        cy.get('[data-testid="dataEsportes"]')
            .invoke('val')
            .should('eql',['natacao', 'Corrida', 'nada'])
    })

})