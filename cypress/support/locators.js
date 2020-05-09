const locators = {
    LOGIN: {
        USERS: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'

    },

    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '.dropdown-toggle',
        CONTAS: '[href="/contas"]',
        RESET_CONTAS: '[href="/reset"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',  
        EXTRATO: '[data-test=menu-extrato]'
    },
    CONTAS: {
        NOME: '.form-control',
        BTN_SALVAR: '.btn',
        FN_XT_BTN_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`,
    },
    MOVIMENTACAO: {
        CONTA: '[data-test="conta"]',
        DESCRICAO: '#descricao',
        VALOR: '.col-4 > .form-control',
        INTERESSADO: '#envolvido',
        BTN_SALVAR: '.btn-primary',
        STATUS: '[data-test="status"]',
    },
    CONTA: {
        XP_CONTA_SALDO: "//td[contains(., 'Conta Cypress Alterada')]/../td[2]",
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMNTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_LINHA: desc => `//span[contains(.,'${desc}')]/../../../..`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    },                             
    MESSAGE: {
        MESSAGEM: '.toast-message',
        MSG_BEM_VINDO: '.toast-success > .toast-message'
    }
}

export default locators;