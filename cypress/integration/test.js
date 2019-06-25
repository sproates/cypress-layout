describe('Getting started with cypress-layout', () => {
  it('should contain at least one story promo', () => {
    cy.visit('http://localhost:7080/pidgin');
    cy.get('section').within(() => {
      cy.get('img')
        .should('have.length.of.at.least', 1)
        .should('be.visible');
      cy.get('h3')
        .should('have.length.of.at.least', 1)
        .should('be.visible')
        // .find('a')
        // .should('have.attr', 'href')
        .is()
        .rightOf('img', '8px');
    });
  });
});
