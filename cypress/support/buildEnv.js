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
            url: '/contas',
        },
        [ 
            { id: 9999997, nome: "Carteira mocada", visivel: true, usuario_id: 1},
            { id: 9999998, nome: "Banco mocado", visivel: true, usuario_id: 1},
        ]).as('Contas')
}

export default buildEnv