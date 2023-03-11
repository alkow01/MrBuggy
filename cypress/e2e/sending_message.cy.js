import $ from "jquery"

describe('Sending a message to the user - test', () =>{
  const randomNumber = () => Cypress._.random(0, 1e6)
  const subjectField = randomNumber()
  const randomSubjectField = `Subject${subjectField}`

  const contentField = randomNumber()
  const randomContentField = `content${contentField}`

  beforeEach( () => {
    cy.basicAuthLogin()
    cy.login('kajowskakaja@lp.pl', 'Test2021')
    cy.get('.item8').click()
    cy.get('a.button_link').click()
    cy.url().should('include', '/wyslij_wiadomosc')
    }) 

    it('Checking the visibility of fields and buttons', () => {
        cy.get('#userName').should('be.visible')
        cy.get('#subject').should('be.visible')
        cy.get('.ckeditor').should('be.visible')
        cy.get('#save').should('be.visible')
        cy.get('.j_cancel_button').should('be.visible')
    })

    it('Validation of message form - empty user name field', () => {
        cy.get('#subject').type(randomSubjectField)
        cy.get('.ckeditor').type(randomContentField)
        cy.get('#userName').should('be.empty')
        cy.get('#save').click()
        cy.get('div.error_msg').eq(0).should('contain', 'Pole wymagane')       
    })

    it('Validation of message form - empty subject field', () => {
        cy.get('#userName').type(`${'bfp4fuser@axtonic.me'}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').should('be.empty')
        cy.get('.ckeditor').type(randomContentField)
        cy.get('#save').click()
        cy.get('div.error_msg').eq(0).should('contain', 'Pole wymagane')       
    })

    it('Validation of message form - empty textarea field', () => {
        cy.get('#userName').type(`${'bfp4fuser@axtonic.me'}{downArrow}`)
        cy.get('li.ui-menu-item').invoke('show').click()
        cy.get('#subject').type(randomSubjectField)
        cy.get('.ckeditor').should('be.empty')
        cy.get('#save').click()
        cy.get('div.error_msg').eq(0).should('contain', 'Pole wymagane')       
    })

    it('Validation of message form - all fields are empty', () => {
      cy.get('form').eq(1).submit();
      const requiredFieldNames = ['userName', 'subject', 'content'];
      cy.wrap(requiredFieldNames).each((requiredFieldName) => {
      cy.get('[for="' + requiredFieldName + '"]').then(($field) => {
        cy.wrap($field).its('length').should('be.gt', 0, 'Element with name ' +          requiredFieldName + ' exists.');
          const $nextElementAfterTheInput = $field.parent().parent().find('.error_msg');
          cy.wrap($nextElementAfterTheInput).its('length').should('be.gt', 0);
          cy.wrap($nextElementAfterTheInput).contains('Pole wymagane').should('have.text', 'Pole wymagane')
        })
      })
    })

    it('Validation of message form - verification of "cancel" button', () => {
      cy.get('#userName').type(`${'bfp4fuser@axtonic.me'}{downArrow}`)
      cy.get('li.ui-menu-item').invoke('show').click()
      cy.get('#subject').type(randomSubjectField)
      cy.get('.ckeditor').type(randomContentField)
      cy.get('.j_cancel_button').click()
      cy.url().should('include', '/moje_wiadomosci')
      cy.get('.button_link').should('be.visible')       
  })

    it('Validation of message form - sending a message to inactive user', () => {
      cy.get('#userName').type(`${'balex7974@scurmail.com'}{downArrow}`)
      cy.get('li.ui-menu-item').invoke('show').click()
      cy.get('#subject').type(randomSubjectField)
      cy.get('.ckeditor').type(randomContentField)
      cy.get('#save').click()
      cy.url().should('include', '/wyslij_wiadomosc')       
  })
  
    it('Validation of message form - sending a message to active user', () => {
      cy.get('#userName').type(`${'bfp4fuser@axtonic.me'}{downArrow}`)
      cy.get('li.ui-menu-item').invoke('show').click()
      cy.get('#subject').type(randomSubjectField)
      cy.get('.ckeditor').type(randomContentField)
      cy.get('#save').click()
      cy.url().should('include', 'moje_wiadomosci')  
      cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/wyloguj"]').click().should('be.visible')
  })
})  
