import $ from "jquery"

const randomNumber = () => Cypress._.random(0, 1e6)
const randomName = randomNumber()


describe('Adding/checking the project test', () => {
    it('Adding new project', () => {
        cy.basicAuthLogin()
        cy.login(Cypress.env('admin_user_username'), Cypress.env('admin_user_password'))
        cy.get('.header_admin').click()
        cy.get('.button_link').eq(0).click()
        cy.get('#name').type(randomName)
        cy.get('#prefix').type(randomName)
        cy.get('#token-input-users').type(`${Cypress.env('active_user_username')}{downArrow}`)
        cy.get('.token-input-dropdown-facebook').invoke('show')
        cy.get('.token-input-dropdown-item2-facebook.token-input-selected-dropdown-item-facebook').click({force: true})
        cy.get('#description').type('Test decription')
        cy.get('#save').click()
    })

    it('Login as active user and checking assigned project', () => {
        cy.basicAuthLogin()
        cy.login(Cypress.env('active_user_username'), Cypress.env('active_user_password'))
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/profil"]').eq(1).click()
        cy.fixture('roles').then((roles) => {
            cy.contains('td', randomName).siblings().contains('b', roles.leader).should('have.text', roles.leader)
        })
        cy.contains('td', randomName).parent().within($tr => {
            cy.get('td a').contains(randomName).should('have.text', randomName)
        })
    })    
})

