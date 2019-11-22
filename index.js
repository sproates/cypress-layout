/* eslint-disable no-underscore-dangle */
const deepEqual = require('deep-equal');
require('./lib');

function getRectDiff(minuend, subtrahend, expected) {
  const difference = Object.assign({}, expected);
  Object.keys(difference).forEach((key) => {
    if ((key === 'bottom' && subtrahend[key] > 0) || (key === 'right' && subtrahend[key] > 0)) {
      difference[key] = -(minuend[key] - subtrahend[key]);
    } else {
      difference[key] = minuend[key] - subtrahend[key];
    }
  });
  return difference;
}

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
  dimensions.top += parseFloat(cs.paddingTop);
  dimensions.bottom -= parseFloat(cs.paddingBottom);
  dimensions.width -= (parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight));
  dimensions.height -= (parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom));
  dimensions.x += parseFloat(cs.paddingLeft);
  dimensions.y += parseFloat(cs.paddingTop);
  return dimensions;
}

function getRect(subject) {
  let element;
  if (typeof subject === 'string') { // the selector passed in to thre assertion
    [element] = Cypress.$(subject);
  } else if (subject.constructor.name === 'jQuery') { // the element from cy.get() i.e this._obj
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

function getActual(calc) {
  if (Cypress.config('roundLayoutValues')) return Math.round(calc());
  return calc();
}

const positioned = (_chai) => {
  function leftOf(element, measure) {
    const rects = getRects(this._obj, element);
    const actual = getActual(() => -(rects[0].right - rects[1].left));
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be left of ${element} by #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be left of ${element} by #{exp} but got #{act}`,
      measure,
      actual,
    );
  }

  function rightOf(element, measure) {
    const rects = getRects(this._obj, element);
    const actual = getActual(() => rects[0].left - rects[1].right);
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be right of ${element} by #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be right of ${element} by #{exp} but got #{act}`,
      measure,
      actual,
    );
  }

  const { Assertion } = chai;
  Assertion.overwriteMethod('above', _super => function assertAbove(element, measure) {
    const obj = this._obj;
    if (obj.constructor.name === 'jQuery') {
      const rects = getRects(obj, element);
      const actual = getActual(() => -(rects[0].bottom - rects[1].top));
      this.assert(
        actual === measure,
        `expected ${this._obj.selector} to be above ${element} by #{exp} but got #{act}`,
        `expected ${this._obj.selector} to not be above ${element} by #{exp} but got #{act}`,
        measure,
        actual,
      );
    } else {
      _super.apply(this, arguments);
    }
  });

  Assertion.overwriteMethod('below', _super => function assertBelow(element, measure) {
    const obj = this._obj;
    if (obj.constructor.name === 'jQuery') {
      const rects = getRects(obj, element);
      const actual = getActual(() => rects[0].top - rects[1].bottom);
      this.assert(
        actual === measure,
        `expected ${this._obj.selector} to be above ${element} by #{exp} but got #{act}`,
        `expected ${this._obj.selector} to not be above ${element} by #{exp} but got #{act}`,
        measure,
        actual,
      );
    } else {
      _super.apply(this, arguments);
    }
  });

  _chai.Assertion.addMethod('leftOf', leftOf);
  _chai.Assertion.addMethod('rightOf', rightOf);
};

const aligned = (_chai) => {
  function leftAligned(element) {
    const rects = getRects(this._obj, element);
    this.assert(
      rects[0].left === rects[1].left,
      `expected ${this._obj.selector} to be left aligned with ${element}`,
      `expected ${this._obj.selector} to not left aligned with ${element}`,
    );
  }

  function rightAligned(element) {
    const rects = getRects(this._obj, element);
    this.assert(
      rects[0].right === rects[1].right,
      `expected ${this._obj.selector} to be right aligned with ${element}`,
      `expected ${this._obj.selector} to not be right aligned with ${element}`,
    );
  }

  function topAligned(element) {
    const rects = getRects(this._obj, element);
    this.assert(
      rects[0].top === rects[1].top,
      `expected ${this._obj.selector} to be top aligned with ${element}`,
      `expected ${this._obj.selector} to not be top aligned with ${element}`,
    );
  }

  function bottomAligned(element) {
    const rects = getRects(this._obj, element);
    this.assert(
      rects[0].bottom === rects[1].bottom,
      `expected ${this._obj.selector} to be bottom aligned with ${element}`,
      `expected ${this._obj.selector} to not be bottom aligned with ${element}`,
    );
  }

  _chai.Assertion.addMethod('leftAligned', leftAligned);
  _chai.Assertion.addMethod('rightAligned', rightAligned);
  _chai.Assertion.addMethod('topAligned', topAligned);
  _chai.Assertion.addMethod('bottomAligned', bottomAligned);
};

const contained = (_chai) => {
  // Need to figure out how to handle case where no dimensions are not sent
  function inside(element, dimensions) {
    const rects = getRects(this._obj, element);
    const actual = getRectDiff(rects[0], rects[1], dimensions);
    this.assert(
      deepEqual(actual, dimensions)`expected ${this._obj.selector} to be #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} but got #{act}`,
      dimensions,
      actual,
    );
  }

  function centred(element, axis = 'vertically') {
    let dimensions;
    let bounds;
    const rects = getRects(this._obj, element);
    if (axis === 'vertically') {
      dimensions = { left: null, right: null };
    } else if (axis === 'horizontally') {
      dimensions = { top: null, bottom: null };
    } else {
      throw new Error(`Invalid axis: ${axis}, please use either 'vertical' or 'horizontal'`);
    }

    const { prop1, prop2 } = getRectDiff(rects[0], rects[1], dimensions);

    this.assert(
      prop1 === prop2 && inside(element),
      `expected ${this._obj.selector} to be #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} but got #{act}`,
      dimensions,
      actual,
    );
  }

  _chai.Assertion.addMethod('inside', inside);
};

const dimensions = (_chai) => {
  function width(measure) {
    const rect = getRect(this._obj);
    const actual = getActual(() => rect.width);
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be #{exp} wide but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} wide but got #{act}`,
      measure,
      actual,
    );
  }

  function widthOf(element, measure) {
    const rects = getRects(this._obj, element);
    const actual = getActual(() => (rects[0].width / rects[1].width) * 100);
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be #{exp} of ${element} but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} of ${element} but got #{act}`,
      measure,
      actual,
    );
  }

  function height(measure) {
    const rect = getRect(this._obj);
    const actual = getActual(() => rect.height);
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be #{exp} high but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} high but got #{act}`,
      measure,
      actual,
    );
  }

  function heightOf(element, measure) {
    const rects = getRects(this._obj, element);
    const actual = getActual(() => (rects[0].height / rects[1].height) * 100);
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be #{exp} of ${element} but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} of ${element} but got #{act}`,
      measure,
      actual,
    );
  }

  _chai.Assertion.addMethod('width', width);
  _chai.Assertion.addMethod('widthOf', widthOf);
  _chai.Assertion.addMethod('height', height);
  _chai.Assertion.addMethod('heightOf', heightOf);
};

chai.use(aligned);
chai.use(positioned);
chai.use(dimensions);
chai.use(contained);
