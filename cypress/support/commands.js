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
Cypress.Commands.add('basicAuthLogin', () => {
    const username = Cypress.env('app_username');
    const password = Cypress.env('app_password');
    cy.visit('/', {
        auth: {
            username, password
        },
    })
})
Cypress.Commands.add('login', (username, password) => {
    if (username) {
        cy.get('#email').type(username)
    }

    if (password) {
        cy.get('#password').type(password, {log: false})
    }

    cy.get('#login').click()
})