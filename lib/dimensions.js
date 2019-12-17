/* eslint-disable no-underscore-dangle */
const rect = require('./rects');

const dimensions = (_chai) => {
  function width(measure) {
    const rec = rect.getRect(this._obj);
    const actual = rect.getActual(() => rec.width);
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be #{exp} wide but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} wide but got #{act}`,
      measure,
      actual,
    );
  }

  function widthOf(element, measure) {
    const rects = rect.getRects(this._obj, element);
    // const actual = rect.getActual(() => (rects[0].width / rects[1].width));
    const actual = parseFloat((rects[0].width / rects[1].width).toFixed(2));
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be #{exp} of ${element} but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} of ${element} but got #{act}`,
      measure,
      actual,
    );
  }

  function height(measure) {
    const rec = rect.getRect(this._obj);
    const actual = rect.getActual(() => rec.height);
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be #{exp} high but got #{act}`,
      `expected ${this._obj.selector} to not be #{exp} high but got #{act}`,
      measure,
      actual,
    );
  }

  function heightOf(element, measure) {
    const rects = rect.getRects(this._obj, element);
    // const actual = (rects[0].height / rects[1].height).toFixed(2);
    const actual = parseFloat((rects[0].height / rects[1].height).toFixed(2));
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

chai.use(dimensions);

module.exports = { dimensions };
