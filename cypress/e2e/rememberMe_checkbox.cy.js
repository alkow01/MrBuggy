describe('"Remember me" test', () => {
  it('Ability to remember the user during logging in', () => {
      cy.basicAuthLogin()
      cy.get('#remember').check().should('be.visible')
      cy.login('bdb31@waitloek.fun', 'EX7fO2x8')
      cy.basicAuthLogin()
      cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/wyloguj"]').click().should("be.visible")
      cy.get('#login').should('be.visible')
    }) 
})

  