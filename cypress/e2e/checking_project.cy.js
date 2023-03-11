import $ from "jquery"

const randomNumber = () => Cypress._.random(0, 1e6)
const randomProjectName = randomNumber()
const randomPrefixName = randomName()

describe('Adding/checking the project test', () => {
    it('Adding new project', () => {
        cy.basicAuthLogin()
        cy.login('bfp4fuser@axtonic.me', '72L7Eztv') 
        cy.get('.header_admin').click()
        cy.get('.button_link').eq(0).click()
        cy.get('#name').type(randomProjectName)
        cy.get('#prefix').type(randomPrefixName)
        cy.get('#token-input-users').type(`${'bdb31@waitloek.fun'}{downArrow}`)
        cy.get('.token-input-dropdown-facebook').invoke('show')
        cy.get('.token-input-dropdown-item2-facebook.token-input-selected-dropdown-item-facebook').click({force: true})
        cy.get('#description').type('Test decription')
        cy.get('#save').click()
    })

    it('Login as active user and checking assigned project', () => {
        cy.basicAuthLogin()
        cy.login('bdb31@waitloek.fun', 'EX7fO2x8')
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/profil"]').eq(1).click()
        cy.fixture('roles').then((roles) => {
            cy.contains('td', randomProjectName).siblings().contains('b', roles.leader).should('have.text', roles.leader)
        })
        cy.contains('td', randomProjectName).parent().within($tr => {
            cy.get('td a').contains(randomProjectName).should('have.text', randomProjectName)
        })
    })    
})

