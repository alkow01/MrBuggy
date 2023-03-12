describe('Sending a message to the user - test', () => {
    const randomNumberGenerator = () => Cypress._.random(0, 1e6)
    let randomSubjectName = '';
    let randomMessage = '';

    beforeEach(() => {
        cy.basicAuthLogin()
        cy.login(Cypress.env('active_user_username'), Cypress.env('active_user_password'))
        cy.get('.item8').click()
        cy.get('a.button_link').click()
        cy.url().should('include', '/wyslij_wiadomosc')
        const randomNumber = randomNumberGenerator()
        randomSubjectName = `name${randomNumber}`
        randomMessage = `content${randomNumber}`
    })

    it('Checking the visibility of fields and buttons', () => {
        cy.get('#userName').should('be.visible')
        cy.get('#subject').should('be.visible')
        cy.get('.ckeditor').should('be.visible')
        cy.get('#save').should('be.visible')
        cy.get('.j_cancel_button').should('be.visible')
    })

    it('Validation of message form - empty user name field', () => {
        cy.get('#subject').type(randomSubjectName)
        cy.get('.ckeditor').type(randomMessage)
        cy.get('#userName').should('be.empty')
        cy.get('#save').click()
        cy.get('div.error_msg').eq(0).should('contain', 'Pole wymagane')
    })

    it('Validation of message form - empty subject field', () => {
        cy.get('#userName').type(`${Cypress.env('admin_user_username')}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').should('be.empty')
        cy.get('.ckeditor').type(randomMessage)
        cy.get('#save').click()
        cy.get('div.error_msg').eq(0).should('contain', 'Pole wymagane')
    })

    it('Validation of message form - empty textarea field', () => {
        cy.get('#userName').type(`${Cypress.env('admin_user_username')}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').type(randomSubjectName)
        cy.get('.ckeditor').should('be.empty')
        cy.get('#save').click()
        cy.get('div.error_msg').eq(0).should('contain', 'Pole wymagane')
    })

    it('Validation of message form - all fields are empty', () => {
        cy.get('form').eq(1).submit();
        const requiredFieldNames = ['userName', 'subject', 'content']
        cy.wrap(requiredFieldNames).each((requiredFieldName) => {
            cy.get('[for="' + requiredFieldName + '"]').then(($field) => {
                cy.wrap($field).its('length').should('be.gt', 0)
                const $nextElementAfterTheInput = $field.parent().parent().find('.error_msg')
                cy.wrap($nextElementAfterTheInput).its('length').should('be.gt', 0)
                cy.wrap($nextElementAfterTheInput).contains('Pole wymagane').should('have.text', 'Pole wymagane')
            })
        })
    })

    it('Validation of message form - verification of "cancel" button', () => {
        cy.get('#userName').type(`${Cypress.env('admin_user_username')}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').type(randomSubjectName)
        cy.get('.ckeditor').type(randomMessage)
        cy.get('.j_cancel_button').click()
        cy.url().should('include', '/moje_wiadomosci')
        cy.get('.button_link').should('be.visible')
    })

    it('Validation of message form - sending a message to inactive user', () => {
        cy.get('#userName').type(`${Cypress.env('inactive_user_username')}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').type(randomSubjectName)
        cy.get('.ckeditor').type(randomMessage)
        cy.get('#save').click()
        cy.url().should('include', '/wyslij_wiadomosc')
    })

    it('Validation of message form - sending a message to active user', () => {
        cy.get('#userName').type(`${Cypress.env('admin_user_username')}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').type(randomSubjectName)
        cy.get('.ckeditor').type(randomMessage)
        cy.get('#save').click()
        cy.url().should('include', 'moje_wiadomosci')
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/wyloguj"]').click().should('be.visible')
    })
})  
