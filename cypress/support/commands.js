// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from './locators'

Cypress.Commands.add('getToken', (user, password) =>{
        cy.request({
            method: 'POST',
            url: '/signin',
            body:{
                email: user,
                redirecionar: false,
                senha: password
            }
        }).its('body.token').should('not.be.empty')
            .then(token =>{
                Cypress.env('token', token)
                return token
            })
})

Cypress.Commands.add('resetRest', () =>{
    cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg').then(token =>{
        cy.request({
            method: 'GET',
            url: '/reset',
    }).its('status').should('be.equal', 200)
    })
})


//Recupera o ID da conta através do Nome
Cypress.Commands.add('getContaByName', (name) =>{
        cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg').then((token) =>{
                cy.request({
                    method: 'GET',
                    url:'/contas',
                    qs:{
                        nome: name  
                    }              
                }).then((res =>{
                    return res.body[0].id
                }))

        })

})

Cypress.Commands.add('getSaldo', () => {
           cy.getToken('alvesferreira.rvinicius@gmail.com', 'meg').then((token) =>{
                cy.request({
                    url:'/saldo',
                    method:'GET',
                })

           })
})

Cypress.Commands.overwrite('request', (originalFnc, ...options) =>{
    if(options.length === 1){
        if(Cypress.env('token')) {
            console.log(options)
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }
    }

    return originalFnc(...options)
})


Cypress.Commands.add('login', (email, password) =>{
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get(loc.LOGIN.USER).type(email)
        cy.get(loc.LOGIN.PASSWORD).type(password)
        cy.get(loc.LOGIN.BTN_LOGIN).click()
})

Cypress.Commands.add('acessarMenuContas', () =>{
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('adicionarConta', conta =>{
        cy.get(loc.CONTAS.NOME).type(conta);
        cy.get(loc.CONTAS.BTN_SALVAR).click()
})