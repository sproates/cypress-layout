describe('Chai plugin', () => {
  beforeEach(() => {
    cy.viewport(1680, 1050);
    cy.visit('https://www.bbc.com/pidgin');
  });

  describe('Alignment', () => {
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

  describe('Positioning', () => {
    it('asserts left of', () => {
      cy.get('section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div > div > div > img')
        .should('be.leftOf', 'section[aria-labelledby="Top-stories"] li:nth-child(1) h3', 16)
        .should('not.be.leftOf', '#root > header > nav > div > ul > li:nth-child(9)', 16);
    });

    it('asserts right of', () => {
      cy.get('section:nth-child(1) > div > ul > li:nth-child(1) > div > div > h3')
        .should('be.rightOf', 'section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div', 16)
        .should('not.be.rightOf', 'section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div', 15)
        .should('not.be.rightOf', 'section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div', 17);
    });

    it('asserts above', () => {
      cy.get('section:nth-child(1) > div > ul > li:nth-child(1)')
        .should('be.above', 'section:nth-child(1) > div > ul > li:nth-child(2)', 48)
        .should('not.be.above', 'section:nth-child(1) > div > ul > li:nth-child(2)', 47)
        .should('not.be.above', 'section:nth-child(1) > div > ul > li:nth-child(2)', 49);
    });

    it('asserts below', () => {
      cy.get('section:nth-child(1) > div > ul > li:nth-child(2)')
        .should('be.below', 'section:nth-child(1) > div > ul > li:nth-child(1)', 48)
        .should('not.be.below', 'section:nth-child(1) > div > ul > li:nth-child(1', 47)
        .should('not.be.below', 'section:nth-child(1) > div > ul > li:nth-child(1', 49);
    });
  });

  describe('Proportions', () => {
    it('checks the width of elements', () => {
      cy.get('section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div > div > div > img')
        .should('have.width', 363)
        .should('not.have.width', 362)
        .should('not.have.width', 364);
    });

    it('checks elements have relative widths', () => {
      cy.get('header')
        .should('be.widthOf', 'body', 100)
        .should('not.be.widthOf', 'body', 99)
        .should('not.be.widthOf', 'body', 101);
    });

    it('checks the height of elements', () => {
      cy.get('section[aria-labelledby="Top-stories"] li:nth-child(1) > div > div > div > div > img')
        .should('have.height', 204)
        .should('not.have.height', 203)
        .should('not.have.height', 205);
    });

    it('checks elements have relative heights', () => {
      cy.get('#root')
        .should('be.heightOf', 'body', 100)
        .should('not.be.heightOf', 'body', 99)
        .should('not.be.heightOf', 'body', 101);
    });
  });

  describe('Inside', () => {
    it('checks whether on element inside another', () => {
      cy.get('#root > header > div > div > a > svg')
        .should('be.inside', '#root > header', {
          top: 110, bottom: 72, left: 200,
        })
        .should('not.be.inside', '#root > header', {
          top: 109, bottom: 71, left: 199,
        })
        .should('not.be.inside', '#root > header', {
          top: 111, bottom: 73, left: 201,
        });
    });
  });
});
