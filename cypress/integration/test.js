describe('Chai plugin', () => {
  before(() => {
    cy.viewport(1680, 1050);
    cy.visit('https://www.bbc.com/pidgin');
  });

  context('Alignment', () => {
    it('asserts left alignment', () => {
      cy.get('nav > div > ul')
        .should('be.leftAligned', '#root > header > div > div')
        .should('not.be.leftAligned', '#root > header > nav > div > ul > li:nth-child(9)');
    });

    it('asserts right alignment', () => {
      cy.get('section[aria-labelledby="Top-stories"] li:nth-child(1)')
        .should('be.rightAligned', 'section[aria-labelledby="Top-stories"] li:nth-child(2)')
        .should('not.be.rightAligned', '#root > header > nav > div > ul > li:nth-child(9)');
    });

    it('asserts top alignment', () => {
      cy.get('section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div > div > div > img')
        .should('be.topAligned', 'section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div > h3')
        .should('not.be.topAligned', '#root > header > nav > div > ul > li:nth-child(9)');
    });

    it('asserts bottom alignment', () => {
      cy.get('section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div > div > div > img')
        .should('be.bottomAligned', 'section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div')
        .should('not.be.bottomAligned', '#root > header > nav > div > ul > li:nth-child(9)');
    });
  });

  context('Positioning', () => {
    it('asserts left of', () => {
      cy.get('section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div > div > div > img')
        .should('be.leftOf', 'section[aria-labelledby="Top-stories"] li:nth-child(1) h3', 16)
        .should('not.be.leftOf', '#root > header > nav > div > ul > li:nth-child(9)', 16);
    });

    it('asserts right of', () => {
      cy.get('section:nth-child(1) > div > ul > li:nth-child(1) > div > div > h3')
        .should('be.rightOf', 'section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div', 16)
        .should('not.be.rightOf', '#root > header > nav > div > ul > li:nth-child(9)', 16);
    });

    it('asserts above', () => {
      cy.get('section:nth-child(1) > div > ul > li:nth-child(1)')
        .should('be.above', 'section:nth-child(1) > div > ul > li:nth-child(2)', 32)
        .should('not.be.above', '#root > header > nav > div > ul > li:nth-child(9)', 32);
    });
  });
});
