/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import '../../support/buildEnv'
import buildEnv from '../../support/buildEnv'

describe('Deve testar a nive funcional', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    // before(() => {
       
    // })

    beforeEach(() => {
        buildEnv()
        cy.login('a@a', 'aaaaa')
        cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Bem vindo, Usuario Mocado!')
        cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()

        cy.get(loc.MENU.HOME).click()
        
        // cy.resetApp()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        // cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Dados resetados com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()
    })

    it('Should create an accoutn', () =>  {    
        cy.route({
            method: 'POST',
            url: '/contas', 
            response: {id: 3, nome: 'Conta Teste', visivel: true, usuario_id: 1},
        }).as('saveConta')
        
        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
                {id: 3, nome: 'Conta Teste', visivel: true, usuario_id: 1},
            ]
        }).as('contasSave')

        cy.inserirConta('Conta Teste')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Conta inserida com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()
    })

    it('Should validate data send to create an account', () =>  {    
        const reqStub = cy.stub()
        cy.route({
            method: 'POST',
            url: '/contas', 
            response: {id: 3, nome: 'Conta Teste', visivel: true, usuario_id: 1},
            // onRequest: req => {
            //     console.log(req)
            //     expect(req.request.body.nome).to.be.empty
            //     expect(req.resquest.headers).to.have.property('Authorization')
            // }
            onRequest: reqStub()

        }).as('saveConta')
        
        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
                {id: 3, nome: 'Conta Teste', visivel: true, usuario_id: 1},
            ]
        }).as('contasSave')

        cy.inserirConta(' {CONTROL} ')
        // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.wait('@saveConta'),then(() => {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].resquest.headers).to.have.property('Authorization')
        })
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'to be empty')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()
    })

    it('Should update an account', () => {

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: { id: 1, nome: 'Conta Alterada', visivel: true, usuario_id: 1},

        })

        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XT_BTN_ALTERAR('Banco')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada com Sucesso')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Conta atualizada com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()   
    })

    it('Should not create an account with same name', () => {
        cy.route({
            method: 'POST',
            url: '/contas', 
            response: { "error": "Já existe uma conta com esse mesmo nome!"},
            status: 400,
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'code 400')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click() 
    })

    it('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {"id":124016,"descricao":"Aceite","envolvido":"resd","observacao":null,"tipo":"REC","data_transacao":"2020-05-08T03:00:00.000Z","data_pagamento":"2020-05-08T03:00:00.000Z","valor":"2342.00","status":false,"conta_id":142970,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).type('Inter')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Movimentação inserida com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()   

       
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMNTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.route({
          method: 'GET',
          url: '/transacoes/**',
          response:   {
            "conta": "Conta para saldo",
            "id": 124019,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2020-05-08T03:00:00.000Z",
            "data_pagamento": "2020-05-08T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 142980,
            "usuario_id": 1,
            "transferencia_id": null,
            "parcelamento_id": null
          },
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response:   {
              "conta": "Conta para saldo",
              "id": 124019,
              "descricao": "Movimentacao 1, calculo saldo",
              "envolvido": "CCC",
              "observacao": null,
              "tipo": "REC",
              "data_transacao": "2020-05-08T03:00:00.000Z",
              "data_pagamento": "2020-05-08T03:00:00.000Z",
              "valor": "3500.00",
              "status": false,
              "conta_id": 142980,
              "usuario_id": 1,
              "transferencia_id": null,
              "parcelamento_id": null
            },
          })

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Movimentação alterada com sucesso!')
        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 999,
                conta: "Carteira",
                saldo: "4034,00"
            },
            {
                conta_id: 9909,
                conta: "Banco",
                saldo: "10000.00"
            },
            ]
        }).as('saldoFinal')
       
        // cy.get(loc.MESSAGE.MESSAGEM).click()


        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', 'R$ 4.034,00')
    })

    it('Should remova a transaction', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist')
        cy.get(loc.MESSAGE.MESSAGEM).should('contain', 'Movimentação removida com sucesso!')
        // cy.get(loc.MESSAGE.MESSAGEM).should('exist').click()  
    })

    it('Should test colors', () => {
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {"conta":"Conta para movimentacoes","id":124017,"descricao":"Receita paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2020-05-08T03:00:00.000Z","data_pagamento":"2020-05-08T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":142978,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":124018,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2020-05-08T03:00:00.000Z","data_pagamento":"2020-05-08T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":142979,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":124019,"descricao":"Despesa paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2020-05-08T03:00:00.000Z","data_pagamento":"2020-05-08T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":142980,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":124020,"descricao":"despesa pendente","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-05-08T03:00:00.000Z","data_pagamento":"2020-05-08T03:00:00.000Z","valor":"-1000.00","status":false,"conta_id":142980,"usuario_id":1,"transferencia_id":null,"parcelamento_id":null},
            ]
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('despesa pendente')).should('have.class', 'despesaPendente')
    })

    it('Should test the responsiveness', () => {
        cy.get('[data-test=menu-home]').should('exist')
        .and('be.visible')

        cy.viewport('iphone-5')

        cy.get('[data-test=menu-home]').should('exist')
        .and('be.not.visible')
    })
})