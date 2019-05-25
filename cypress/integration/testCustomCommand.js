import el from '../support/elements';
import testPage from '../support/testPage';

describe('testing custom commands', () => {
  before(() => {
    cy.viewport(1680, 1050);
  });

  it('tests that assertios can be chained', () => {
    cy.document().then((doc) => {
      // eslint-disable-next-line no-param-reassign
      doc.body.innerHTML = testPage;
    });
    cy.get(el.midMiddleInner)
      .isLeftAlignedWith(el.topMiddleInner)
      .isRightAlignedWith(el.topMiddleInner)
      .isTopAlignedWith('.thirteen')
      .isBottomAlignedWith('.thirteen')
      .isBelow(el.topMiddleInner, 300)
      .isAbove(el.bottomMiddleOuter, '200.1px')
      .isLeftOf(el.midRightOuter, '200px')
      .isRightOf(el.midLeftInner, '300px')
      .hasWidthOf('50%')
      .hasHeightOf('200px')
      .isInside('.five', {
        top: '100px', left: '100px', bottom: '100px', right: '100px',
      });

    cy.get(el.topLeftOuter)
      .isInside('&document', { top: '0px', left: '0px' });
  });
});
