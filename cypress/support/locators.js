const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },

    INICIAL:{
        LOCALIZAR_CONTA: 'table tbody',

    },
    MENU: {
        SETTINGS: '[data-test="menu-settings"]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACOES: '[data-test="menu-movimentacao"]',
        EXTRATO:'[data-test="menu-extrato"]',
        HOME:'[data-test="menu-home"]'

    },

    CONTAS: {
        NOME: '[data-test="nome"]',
        BTN_SALVAR: '.btn'
    },

    MOVIMENTACOES: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        SELECIONAR_CONTA: '[data-test="conta"]',
        STATUS: '[data-test="status"]',
        BTN_SALVAR: '.btn-primary'

    },

    EXTRATO:{
        BUSCA_ELEMENTO: 'div.list-group li.list-group-item div.row',
    },

    MESSAGE: '.toast-message'

}

export default locators;