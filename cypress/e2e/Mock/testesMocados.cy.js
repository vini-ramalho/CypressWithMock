/// <reference types='cypress'/>

import loc from '../../support/locators'
import buildEnv from '../../support/buildEnv'

describe('Deve realizar os testes com dados mocados através de rotas', () =>{

    after(() =>{
        cy.clearLocalStorage()
    })

    beforeEach(() =>{
        buildEnv()
        cy.login('alvesferreira.rvinicius@gmail.com', 'senha incorreta')
        cy.get(loc.MENU.HOME).click()
    })

    it('Deve inserir uma conta com dados Mocados', () =>{

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
            { id: 9999999, nome:"Conta teste", visivel:true, usuario_id:1}

        ]).as('ContasAtt')

        cy.adicionarConta('Conta teste')

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Deve alterar uma conta com sucesso', () =>{

        cy.intercept({
            method: 'PUT',
            url:'/contas/**'
        },
        { id: 9999998, nome:"Banco mocado Alterada", visivel:true, usuario_id:1}

    )

        cy.acessarMenuContas()

        cy.contains('td', 'Banco mocado') //Acessa o TD da tabela de contas
            .parent() //Busca os elementos ancestrais do elemento
            .find('i.fa-edit') //Busca os elementos descendentes
            .click()

        cy.adicionarConta(' Alterada')
        cy.get(loc.MESSAGE).should('contain', 'atualizada')
    })

    it('Deve inserir uma conta com o mesmo nome e retornar erro', () =>{
        cy.intercept({
            method:'POST',
            url:'/contas'
        }, {
            statusCode: 400,
            body:{"error": "Já existe uma conta com esse nome!" }
            }).as('SaveContaMesmoNome')

        cy.acessarMenuContas()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })


})