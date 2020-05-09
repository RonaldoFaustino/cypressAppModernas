/// <reference types="cypress" />


describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    }) 

    it.only('Alert Simples', () => {
        // cy.get('#alert')
        //     .click()
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        cy.clickAlert('window:alert','Alert Simples')
    })

    it('Alert Com Mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            })
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Alert Simples')
        // })
    })

    it('Alert Confirme', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })

        cy.get('#confirm')
            .click()
    })

    it('Deny Alert', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })

        cy.get('#confirm')
            .click()
    })

    it('Prompt', () => {
        cy.window()
            .then(win => {
                cy.stub(win, 'prompt')
                    .returns('23')
            })
        
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 23?')
        })  
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        //TO DO
        // cy.on('window:prompt', msg => {
        //     expect(msg).to.be.equal('Confirm Simples')
        // })
        
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Confirmado')
        // })

        cy.get('#prompt')
            .click()
    })

    it.only('Desafio Alert, validando mensagem', () => {
        const stub = cy.stub().as('alert')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Ronaldo')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Fastino')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
})