/* eslint-disable no-underscore-dangle */
require('./lib');

// the rect returned by el.getBoundingClientRect() isn't writable, which is a
// pain. This produces a facsimile of the rect that is.
function getBoundingClientRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
  };
}

// getBoundingClientRect returns a rect that incorporates padding, we won't
// necessarily want this, if config.removePadding = true we remove it.
function removePadding(object, rect) {
  const dimensions = Object.assign({}, rect);
  const cs = getComputedStyle(object);
  dimensions.left += parseFloat(cs.paddingLeft);
  dimensions.right -= parseFloat(cs.paddingRight);
  dimensions.top -= parseFloat(cs.paddingTop);
  dimensions.bottom += parseFloat(cs.paddingBottom);
  dimensions.width -= parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  dimensions.height -= parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
  dimensions.x += parseFloat(cs.paddingLeft);
  dimensions.y += parseFloat(cs.paddingTop);
  return dimensions;
}

function getRect(subject) {
  let element;

  if (subject === '&document') {
    element = Cypress.$(document).context.documentElement;
  } else if (typeof subject === 'string') { // the selector passed in to assertion
    [element] = Cypress.$(subject);
  } else if (typeof subject === 'object') { // the element from cy.get() i.e this._obj
    [element] = subject;
  } else {
    element = null; // something unknown
  }
  const rect = getBoundingClientRect(element);

  if (Cypress.config('removePadding')) {
    return removePadding(element, rect);
  } return element.getBoundingClientRect();
}

function getRects(first, second) {
  const actual = getRect(first);
  const expected = getRect(second);
  return [actual, expected];
}

const positioned = (_chai) => {
  function leftOf(element, measure) {
    const rects = getRects(this._obj, element);
    const calc = () => -(rects[0].right - rects[1].left);
    this.assert(
      calc() === measure,
      `expected ${this._obj.selector} to be left of ${element} by #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be left of ${element} by #{exp} but got #{act}`,
      measure,
      calc(),
    );
  }

  function rightOf(element, measure) {
    const rects = getRects(this._obj, element);
    const calc = () => rects[0].left - rects[1].right;
    this.assert(
      calc() === measure,
      `expected ${this._obj.selector} to be right of ${element} by #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be right of ${element} by #{exp} but got #{act}`,
      measure,
      calc(),
    );
  }

  const { Assertion } = chai;
  Assertion.overwriteMethod('above', _super => function assertAbove(element, measure) {
    const obj = this._obj;
    if (typeof obj === 'object') {
      const rects = getRects(obj, element);
      const calc = () => rects[0].bottom - rects[1].top;
      this.assert(
        calc() === measure,
        `expected ${this._obj.selector} to be above ${element} by #{exp} but got #{act}`,
        `expected ${this._obj.selector} to not be above ${element} by #{exp} but got #{act}`,
        measure,
        calc(),
      );
    } else {
      _super.apply(this, arguments);
    }
  });

  _chai.Assertion.addMethod('leftOf', leftOf);
  _chai.Assertion.addMethod('rightOf', rightOf);
  // _chai.Assertion.addMethod('above', above);
  // _chai.Assertion.addMethod('below', below);
};

const aligned = (_chai) => {
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
chai.use(positioned);
