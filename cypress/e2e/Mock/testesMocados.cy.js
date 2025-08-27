/// <reference types='cypress'/>

import loc from '../../support/locators'

describe('Deve realizar os testes com dados mocados através de rotas', () =>{


    before(() =>{
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('alvesferreira.rvinicius@gmail.com', 'senha incorreta')

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
            conta_id: 9999998,
            conta: "Carteira mocada",
            saldo: "10000.00"
        },

        {
            conta_id: 9999999,
            conta: "Banco mocado",
            saldo: "100.00"

        }]).as('Saldos')
    })

    it('Deve inserir uma conta com dados Mocados', () =>{

        cy.intercept({
            method: 'GET',
            url: '/contas',
        },
        [ 
            { id: 9999997, nome: "Carteira mocada", visivel: true, usuario_id: 1},
            { id: 9999998, nome: "Banco mocado", visivel: true, usuario_id: 1},
        ]).as('Contas')

        cy.intercept({
            method:'POST',
            url:'/contas'
        },
        { id:9999999, nome:"Conta teste", visivel:true, usuario_id:1}
        ).as('Criar Conta')
                    
        cy.acessarMenuContas()
        cy.intercept({
            method: 'GET',
            url: '/contas',
        },
        [ 
            { id: 9999997, nome: "Carteira mocada", visivel: true, usuario_id: 1},
            { id: 9999998, nome: "Banco mocado", visivel: true, usuario_id: 1},
            { id:9999999, nome:"Conta teste", visivel:true, usuario_id:1}

        ]).as('Contas')
        cy.adicionarConta('Conta teste')

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })
})