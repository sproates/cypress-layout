/* eslint-disable no-underscore-dangle */
const rect = require('./rects');

const positioned = (_chai) => {
  function leftOf(element, measure) {
    const rects = rect.getRects(this._obj, element);
    const actual = rect.getActual(() => -(rects[0].right - rects[1].left));
    this.assert(
      actual === measure,
      `expected ${this._obj.selector} to be left of ${element} by #{exp} but got #{act}`,
      `expected ${this._obj.selector} to not be left of ${element} by #{exp} but got #{act}`,
      measure,
      actual,
    );
  }

  function rightOf(element, measure) {
    const rects = rect.getRects(this._obj, element);
    const actual = rect.getActual(() => rects[0].left - rects[1].right);
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
      const rects = rect.getRects(obj, element);
      const actual = rect.getActual(() => -(rects[0].bottom - rects[1].top));
      this.assert(
        actual === measure,
        `expected ${this._obj.selector} to be above ${element} by #{exp} but got #{act}`,
        `expected ${this._obj.selector} to not be above ${element} by #{exp} but got #{act}`,
        measure,
        actual,
      );
    } else {
      _super.apply(this);
    }
  });

  Assertion.overwriteMethod('below', _super => function assertBelow(element, measure) {
    const obj = this._obj;
    if (obj.constructor.name === 'jQuery') {
      const rects = rect.getRects(obj, element);
      const actual = rect.getActual(() => rects[0].top - rects[1].bottom);
      this.assert(
        actual === measure,
        `expected ${this._obj.selector} to be above ${element} by #{exp} but got #{act}`,
        `expected ${this._obj.selector} to not be above ${element} by #{exp} but got #{act}`,
        measure,
        actual,
      );
    } else {
      _super.apply(this);
    }
  });

  _chai.Assertion.addMethod('leftOf', leftOf);
  _chai.Assertion.addMethod('rightOf', rightOf);
};

chai.use(positioned);

module.exports = { positioned };
