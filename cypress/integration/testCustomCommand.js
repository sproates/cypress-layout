/* eslint-disable newline-per-chained-call */
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
      .is().leftAlignedWith(el.topMiddleInner)
      .should('be.visible')
      .is().rightAlignedWith(el.topMiddleInner)
      .is().topAlignedWith('.thirteen')
      .is().bottomAlignedWith('.thirteen')
      .is().below(el.topMiddleInner, '300px')
      .is().above(el.bottomMiddleOuter, '200.1px')
      .is().leftOf(el.midRightOuter, '200px')
      .is().rightOf(el.midLeftInner, '300px')
      .has().widthOf('50%')
      .has().heightOf('200px')
      .hasnot().heightOf('20px')
      .has().inside('.five', {
        top: '100px', left: '100px', bottom: '100px', right: '100px',
      });

    cy.get(el.topLeftOuter)
      .is().inside('&document', { top: '0px', left: '0px' });
  });
});
