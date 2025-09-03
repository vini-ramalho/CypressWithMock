const buildEnv = () => {
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

        cy.intercept({
            method: 'GET',
            url: '/contas'
        },
        [ 
            { id: 9999997, nome: "Carteira mocada", visivel: true, usuario_id: 1},
            { id: 9999998, nome: "Banco mocado", visivel: true, usuario_id: 1},
        ]).as('Contas')

        cy.intercept({
            method:'GET',
            url:'/extrato/**'
        },
        [

            { "conta": "Conta para movimentacoes", "id": 31434, "descricao": "Movimentacao para exclusao", "envolvido": "AAA", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 42077, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta com movimentacao", "id": 31435, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 42078, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 31436, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 42079, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 31437, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 42079, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 31438, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 42079, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para extrato", "id": 31439, "descricao": "Curso", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 42080, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null }

        ]
    )
}

export default buildEnv