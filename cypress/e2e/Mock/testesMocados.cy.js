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

    it('Deve inserir uma conta com sucesso', () =>{

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

        it.only('Deve inserir uma nova movimentação com sucesso', () =>{
        cy.intercept({
            method:'POST',
            url:'/transacoes'
        },
        {
            "id": 2374940,
            "descricao": "asdasd",
            "envolvido": "teste",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2025-09-03T03:00:00.000Z",
            "data_pagamento": "2025-09-03T03:00:00.000Z",
            "valor": "123.00",
            "status": true,
            "conta_id": 2530943,
            "usuario_id": 61654,
            "transferencia_id": null,
            "parcelamento_id": null
        }
        )


        cy.acessarMenuMovimentacoes()
        cy.get(loc.MOVIMENTACOES.DESCRICAO).type('Curso')
        cy.get(loc.MOVIMENTACOES.VALOR).type('2000')
        cy.get(loc.MOVIMENTACOES.INTERESSADO).type('Vinicius')
        cy.get(loc.MOVIMENTACOES.SELECIONAR_CONTA).select('Banco mocado')
        cy.get(loc.MOVIMENTACOES.STATUS).click()
        cy.get(loc.MOVIMENTACOES.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')

        cy.get(loc.EXTRATO.BUSCA_ELEMENTO)
            .find('span')
            // .should('contain', 'Curso') //Generico com 21 resultados localizados na assertiva
            .contains('Curso')
            .should('have.text', 'Curso')//Apenas um resultado na assertiva
    })

})