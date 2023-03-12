describe('"Remember me" test', () => {
  it('Ability to remember the user during logging in', () => {
      cy.basicAuthLogin()
      cy.get('#remember').check().should('be.visible')
      cy.login(Cypress.env('active_user_username'), Cypress.env('active_user_password'))
      cy.reload()
      cy.basicAuthLogin()
      cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/wyloguj"]').click().should("be.visible")
      cy.get('#login').should('be.visible')
    }) 
})

  