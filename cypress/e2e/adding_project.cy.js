describe('"Adding a project/validation of form fields" test', () => {
    const randomNumberGenerator = () => Cypress._.random(0, 1e6)
    let randomProjectName = '';
    let randomPrefixName = '';

    beforeEach(() => {
        cy.basicAuthLogin()
        cy.login(Cypress.env('admin_user_username'), Cypress.env('admin_user_password'))
        cy.get('.header_admin').click()
        cy.get('.button_link').eq(0).click().should('be.visible')
        const randomNumber = randomNumberGenerator()
        randomProjectName = `name${randomNumber}`
        randomPrefixName = `${randomNumber}`
    })

    it('Validation of adding project form - all fields are empty', () => {
        cy.get('form').submit();
        const requiredFieldNames = ['name', 'prefix'];
        cy.wrap(requiredFieldNames).each((requiredFieldName) => {
            cy.get('[name="' + requiredFieldName + '"]').then(($field) => {
                cy.wrap($field).its('length').should('be.gt', 0)
                const $nextElementAfterTheInput = $field.parent().find('.error_msg')
                cy.wrap($nextElementAfterTheInput).its('length').should('be.gt', 0)
                cy.wrap($nextElementAfterTheInput).contains('Pole wymagane')
            })
        })
    })

    it('Validation of adding project form - empty "Name" field', () => {
        cy.get('.textLabelEditor').should('be.visible')
        cy.get('#name').should('be.empty')
        cy.get('#prefix').type(randomPrefixName)
        cy.get('#token-input-users').type(`${Cypress.env('active_user_username')}{downArrow}`)
        cy.get('.token-input-dropdown-facebook').invoke('show')
        cy.get('.token-input-dropdown-item2-facebook.token-input-selected-dropdown-item-facebook').click({force: true})
        cy.get('#description').type('text content')
        cy.get('#save').click().should('be.visible')
        cy.get('#name').then(($name) => {
            const nameErrorMsg = $name.parent().find('.error_msg')
            cy.wrap(nameErrorMsg).its('length').should('be.gt', 0)
            cy.wrap(nameErrorMsg).contains('Pole wymagane').should('have.text', 'Pole wymagane')
        })
    })

    it('Validation of adding project form - empty "Prefix" field', () => {
        cy.get('.textLabelEditor').should('be.visible')
        cy.get('#name').type(randomProjectName)
        cy.get('#prefix').should('be.empty')
        cy.get('#token-input-users').type(`${Cypress.env('active_user_username')}{downArrow}`)
        cy.get('.token-input-dropdown-facebook').invoke('show')
        cy.get('.token-input-dropdown-item2-facebook.token-input-selected-dropdown-item-facebook').click({force: true})
        cy.get('#description').type('text content')
        cy.get('#save').click()
        cy.get('#prefix').then(($prefix) => {
            const prefixErrorMsg = $prefix.parent().find('.error_msg')
            cy.wrap(prefixErrorMsg).its('length').should('be.gt', 0)
            cy.wrap(prefixErrorMsg).contains('Pole wymagane').should('have.text', 'Pole wymagane')
        })
    })

    it('Validation of adding project form - empty "Leader" field', () => {
        cy.get('.textLabelEditor').should('be.visible')
        cy.get('#name').type(randomProjectName)
        cy.get('#prefix').type(randomPrefixName)
        cy.get('#token-input-users').should('be.empty')
        cy.get('#description').type('text content')
        cy.get('#save').click()
        cy.get('#j_info_box p').contains('Projekt został dodany').should('be.visible')
        cy.url().should('include', '/projects')
    })

    it('Validation of adding project form - empty "Description" field', () => {
        cy.get('.textLabelEditor').should('be.visible')
        cy.get('#name').type(randomProjectName)
        cy.get('#prefix').type(randomPrefixName)
        cy.get('#token-input-users').type(`${Cypress.env('active_user_username')}{downArrow}`)
        cy.get('.token-input-dropdown-facebook').invoke('show')
        cy.get('.token-input-dropdown-item2-facebook.token-input-selected-dropdown-item-facebook').click({force: true})
        cy.get('#description').should('be.empty')
        cy.get('#save').click()
        cy.get('#j_info_box p').contains('Projekt został dodany').should('be.visible')
        cy.url().should('include', '/projects')
    })

    it('Validation of adding project form - checking "Cancel" button', () => {
        cy.get('.textLabelEditor').should('be.visible')
        cy.get('#name').type(randomProjectName)
        cy.get('#prefix').type(randomPrefixName)
        cy.get('#token-input-users').type(`${Cypress.env('active_user_username')}{downArrow}`)
        cy.get('.token-input-dropdown-facebook').invoke('show')
        cy.get('.token-input-dropdown-item2-facebook.token-input-selected-dropdown-item-facebook').click({force: true})
        cy.get('#description').type('text content')
        cy.get('.j_cancel_button').click().should('be.visible')
        cy.url().should('include', '/projects')
        cy.get('a.button_link').contains('Dodaj projekt').should('be.visible')
    })
})



