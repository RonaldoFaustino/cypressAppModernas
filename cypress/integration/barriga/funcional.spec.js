/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar a nive funcional', () => {
    before(() => {
        cy.login('a@a', 'a')
        cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Bem vindo, a!')
        cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Dados resetados com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()
       
    })

    it('Should create an accoutn', () =>  {
        cy.acessarMenuConta()
        cy.inserirConta('Conta Test')

        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Conta inserida com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()
    })

    it.only('Should update an account', () => {
        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XT_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada com Sucesso')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Conta atualizada com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()   
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'code 400')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click() 
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).type('Inter')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Movimentação inserida com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()   

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMNTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Movimentação inserida com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).click()


        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', 'R$4034,00')
    })

    it('Should remova a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Movimentação removida com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()  
    })
})