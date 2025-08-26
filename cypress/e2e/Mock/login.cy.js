/// <reference types='cypress'/>

import loc from '../../support/locators'

describe('Fazer login com dados Mocados', () =>{

    before(() =>{
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('alvesferreira.rvinicius@gmail.com', 'senha incorreta')
    })

    it('Deve realizar o de login com sucesso utilizando dados mocados', () =>{

        cy.intercept({
            method: 'POST',
            url: '/signin'
            
        },
        {
            id: '1',
            nome:'Usuário Mocado',
            token: 'Token Mocado'
        }).as('Login')

        cy.intercept({
            method:'GET',
            url:'/saldo'
        },
        [{
            conta_id: 9999999,
            conta: "Conta mocada",
            saldo: "10000.00"
        }]).as('Saldos')
    })
})