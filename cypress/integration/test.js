it('uses a custom chai helper', () => {
  cy.viewport(1680, 1050);
  cy.visit('https://www.bbc.co.uk/news');
  cy.get('#orb-modules > header').should('be.leftAligned', '#orb-modules');
  cy.get('#nw-c-topstories-domestic').should('be.rightAligned', '#orb-modules > header');
  cy.get('#nw-c-topstories-domestic').should('not.be.rightAligned', 'nav.nw-c-nav__wide');
  cy.get('.nw-c-top-stories__primary-item').should('be.topAligned', 'div.nw-c-top-stories__secondary-item--1');
  cy.get('.nw-c-top-stories__primary-item').should('be.bottomAligned', 'div.nw-c-top-stories__secondary-item--1');
});
