import $ from "jquery"

describe('Profile view test', () => {
    it('Correct display of user data in profile view', () => {
        const $formLabels = ['Adres e-mail: ', 'Firma/Organizacja: ', 'Dział: ', 'Nr telefonu: ', 'Administrator: ']

        cy.basicAuthLogin()
        cy.login('bdb31@waitloek.fun', 'EX7fO2x8')
        cy.get('.avatar_header').eq(0).click().should('be.visible')
        cy.url().should('include', '/profil')
        cy.go('back')
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/profil"]').eq(1).click().should('be.visible')
        cy.url().should('include', '/profil')
        cy.get('.contentProperties_left').within(() => {
            cy.get('.textLabelPropertiesDiv').first().nextAll().each(($element) => {
                const $elementTextHolder = $element.find('.textLabelEditor_text')
                cy.wrap($elementTextHolder).invoke('text').then(($label) =>{
                    expect($formLabels).to.include($label)
                })
            })
        })
        cy.get('.content_label').eq(4).should('contain', 'Nie')
        cy.fixture('roles').then((roles) => {
            cy.contains('td', 'Być testerem').siblings().contains('b', roles.tester).should('have.text', roles.tester)
            cy.contains('td', 'Testowanie 24').siblings().contains('b', roles.guest).should('have.text', roles.guest)
            cy.contains('td', 'Testowanie to jest to').siblings().contains('b', roles.leader).should('have.text', roles.leader)
          })
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/project_view/1208"]').click()
        cy.url().should('include', '/project_view/1208')
        cy.go('back')
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/project_view/1222"]').click()
        cy.url().should('include', '/project_view/1222')
        cy.go('back')
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/project_view/1227"]').click()
        cy.url().should('include', '/project_view/1227')
        cy.go('back')
        cy.get('[href="http://demo-sii.mrbuggy2.testarena.pl/wyloguj"]').click().should("be.visible")
        cy.login('bfp4fuser@axtonic.me', '72L7Eztv')
        cy.get('.avatar_header').eq(0).click()
        cy.url().should('include', '/profil')
        cy.get('.content_label').eq(4).should('contain', 'Tak')
    })
  })