describe('Gateway app', function() {

  describe('Gateway Ops', function() {
    it('A gateway can be created', function() {
      cy.visit('http://localhost:3000')
      cy.contains('New Gateway').click()
      cy.get('#serial').type('S199999')
      cy.get('#name').type('TESTGATEWAY')
      cy.get('#ip_v4').type('198.200.21.22')
      cy.get('#add-gateway-button').click()
      cy.contains('S199999')
    })

    describe('add a gateway and...', function () {
      beforeEach(function () {
        cy.createGateway({
          'serial': 'S996999',
          'name': 'TESTGATEWAYD',
          'ip_v4': '198.200.21.22'
        })
      })

      it('can be removed', function () {
        cy.get('html').find('.rdt_TableBody').contains('TESTGATEWAYD').parent('').parent('').as('MyContainer')
        cy.get('@MyContainer').find('.removeBtn').click()
        cy.get('html').should('not.contain', 'S996999')
      })
    })

  })

})