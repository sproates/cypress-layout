/* eslint-disable no-underscore-dangle */
const deepEqual = require('deep-equal');
const rect = require('./rects');

const contained = (_chai) => {
  const { Assertion } = chai;

  function inside(element, dimensions) {
    const rects = rect.getRects(this._obj, element);
    const actual = rect.getRectDiff(rects[0], rects[1], dimensions);
    if (dimensions === undefined) {
      // If the expected dimensions are missing, we just want to chek whether
      // the subject is inside the element specified
      this.assert(
        Object.values(actual).every(x => x >= 0),
        `expected ${this._obj.selector} to be inside #{exp} but got #{act}`,
        `expected ${this._obj.selector} to not be inside #{exp} but got #{act}`,
        actual,
        element,
      );
    } else {
      this.assert(
        deepEqual(actual, dimensions),
        `expected ${this._obj.selector} to be #{exp} but got #{act}`,
        `expected ${this._obj.selector} to not be #{exp} but got #{act}`,
        dimensions,
        actual,
      );
    }
  }

  function centred(element, axis = 'vertically') {
    let dimensions;
    const rects = rect.getRects(this._obj, element);
    if (axis === 'vertically') {
      dimensions = { left: null, right: null };
    } else if (axis === 'horizontally') {
      dimensions = { top: null, bottom: null };
    } else {
      throw new Error(`invalid axis: ${axis}, please use either 'vertical' or 'horizontal'`);
    }
    const actual = rect.getRectDiff(rects[0], rects[1], dimensions);
    const [prop1, prop2] = Object.values(actual);

    new Assertion(this._obj).to.be.inside(element);

    this.assert(
      prop1 === prop2,
      `expected ${this._obj.selector} to be centred within #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be centred within #{exp} but got #{act}`,
      element,
      actual,
    );
  }

  _chai.Assertion.addMethod('inside', inside);
  _chai.Assertion.addMethod('centred', centred);
};

chai.use(contained);

module.exports = { contained };
