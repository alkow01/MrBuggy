describe('Login Test', () => {
    beforeEach(() => {
        cy.basicAuthLogin()
    })

    it('Successful login by providing correct e-mail and password', () => {
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.login('bdb31@waitloek.fun', 'EX7fO2x8')
        cy.get("a").should("contain", 'Wyloguj')
    })

    it('Fail login for provided incorrect e-mail and password', () => {
        cy.login('test@test.pl', 'test')
        cy.get('div.login_form_error')
            .contains('Adres e-mail i/lub hasło są niepoprawne.')
            .should('be.visible')
    })

    it('Fail login for provided incorrect e-mail and correct password', () => {
        cy.login('test@test.pl', 'EX7fO2x8')
        cy.get('div.login_form_error')
            .contains('Adres e-mail i/lub hasło są niepoprawne.')
            .should('be.visible')
    })

    it('Fail login for provided correct e-mail and incorrect password', () => {
        cy.login('bdb31@waitloek.fun', 'test1')
        cy.get('div.login_form_error')
            .contains('Adres e-mail i/lub hasło są niepoprawne.')
            .should('be.visible')
    })

    it('Fail login for provided incorrect e-mail and empty field for password', () => {
        cy.login('bdb31@waitloek.fun')
        cy.get('input#login').click()
        cy.get('div.login_form_error')
            .contains('Adres e-mail i/lub hasło są niepoprawne.')
            .should('be.visible')
        cy.get('div.login_form_error').contains('Pole wymagane').should('be.visible')
    })

    it('Fail login for provided correct password and empty field for e-mail', () => {
        cy.login('', 'EX7fO2x8')
        cy.get('div.login_form_error')
            .contains('Adres e-mail i/lub hasło są niepoprawne.')
            .should('be.visible')
        cy.get('div.login_form_error')
            .contains('Pole wymagane')
            .should('be.visible')
    })

    it('Fail login for provided empty e-mail and password fields', () => {
        cy.login('', '')
        cy.get('#login').click()
        cy.get('div.login_form_error')
            .contains('Adres e-mail i/lub hasło są niepoprawne.')
            .should('be.visible')
        const requiredFieldNames = ['email', 'password'];
        cy.wrap(requiredFieldNames).each((requiredFieldName) => {
            cy.get('[name="' + requiredFieldName + '"]').then(($field) => {
                const $nextElementAfterTheInput = $field.parent().parent().find('div.login_form_error')
                cy.wrap($nextElementAfterTheInput).its('length').should('be.gt', 0)
                cy.wrap($nextElementAfterTheInput)
                    .contains('Pole wymagane')
                    .should('have.text', 'Pole wymagane')
            })
        })
    })
})
     
    
 
 