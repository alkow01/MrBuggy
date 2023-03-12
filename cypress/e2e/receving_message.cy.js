const randomNumber = () => Cypress._.random(0, 1e6)
const randomSubjectField = randomNumber()

const contentField = randomNumber()
const randomContentField = `content${contentField}`

describe('Sending a message/checking the received message on the active user/s account', () => {
    it('Sending a message to active user', () => {
        cy.basicAuthLogin()
        cy.login(Cypress.env('active_user_username'), Cypress.env('active_user_password'))
        cy.get('.item8').click()
        cy.get('a.button_link').click()
        cy.url().should('include', '/wyslij_wiadomosc')
        cy.get('#userName').type(`${Cypress.env('admin_user_username')}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').type(randomSubjectField)
        cy.get('.ckeditor').type(randomContentField)
        cy.get('#save').click()
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/wyloguj"]').click()
        cy.login(Cypress.env('admin_user_username'), Cypress.env('admin_user_password'))
        cy.get('.PanelList').eq(0).find('ul li').first().then(($li) => {
            cy.wrap($li).find('div.author').should('contain', 'Kaja Kajowska')
            cy.wrap($li).find('div.snippet.preview').find('span strong').should('contain', randomSubjectField)
        })
    })
}) 

