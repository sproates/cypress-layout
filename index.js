/* eslint-disable no-underscore-dangle */
require('./lib');

function getRect(subject) {
  if (subject === '&document') {
    return Cypress.$(document).context.documentElement.getBoundingClientRect();
  }
  if (typeof subject === 'string') { // the selector passed in to assertion
    return Cypress.$(subject)[0].getBoundingClientRect();
  }
  if (typeof subject === 'object') { // the element from cy.get() i.e this._obj
    return subject[0].getBoundingClientRect();
  }
  return null; // something unknown
}

function getRects(first, second) {
  const actual = getRect(first);
  const expected = getRect(second);
  return [actual, expected];
}

const aligned = (_chai, utils) => {
  function leftAligned(element) {
    const rects = getRects(element, this._obj);
    this.assert(
      rects[0].left === rects[1].left,
      `expected ${this._obj.selector} to be left aligned with ${element}`,
      `expected ${this._obj.selector} to not left aligned with ${element}`,
      this._obj,
    );
  }

  function rightAligned(element) {
    const rects = getRects(element, this._obj);
    this.assert(
      rects[0].right === rects[1].right,
      `expected ${this._obj.selector} to be right aligned with ${element}`,
      `expected ${this._obj.selector} to not be right aligned with ${element}`,
      this._obj,
    );
  }

  function topAligned(element) {
    const rects = getRects(element, this._obj);
    this.assert(
      rects[0].top === rects[1].top,
      `expected ${this._obj.selector} to be top aligned with ${element}`,
      `expected ${this._obj.selector} to not be top aligned with ${element}`,
      this._obj,
    );
  }

  function bottomAligned(element) {
    const rects = getRects(element, this._obj);
    this.assert(
      rects[0].bottom === rects[1].bottom,
      `expected ${this._obj.selector} to be bottom aligned with ${element}`,
      `expected ${this._obj.selector} to not be bottom aligned with ${element}`,
      this._obj,
    );
  }

  _chai.Assertion.addMethod('leftAligned', leftAligned);
  _chai.Assertion.addMethod('rightAligned', rightAligned);
  _chai.Assertion.addMethod('topAligned', topAligned);
  _chai.Assertion.addMethod('bottomAligned', bottomAligned);
};

chai.use(aligned);
