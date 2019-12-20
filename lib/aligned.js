/* eslint-disable no-underscore-dangle */
const rect = require('./rects');

const aligned = (_chai) => {
  function leftAligned(element) {
    const rects = rect.getRects(this._obj, element);
    this.assert(
      rects[0].left === rects[1].left,
      `expected ${this._obj.selector} to be left aligned with ${element}`,
      `expected ${this._obj.selector} to not be left aligned with ${element}`,
    );
  }

  function rightAligned(element) {
    const rects = rect.getRects(this._obj, element);
    this.assert(
      rects[0].right === rects[1].right,
      `expected ${this._obj.selector} to be right aligned with ${element}`,
      `expected ${this._obj.selector} to not be right aligned with ${element}`,
    );
  }

  function topAligned(element) {
    const rects = rect.getRects(this._obj, element);
    this.assert(
      rects[0].top === rects[1].top,
      `expected ${this._obj.selector} to be top aligned with ${element}`,
      `expected ${this._obj.selector} to not be top aligned with ${element}`,
    );
  }

  function bottomAligned(element) {
    const rects = rect.getRects(this._obj, element);
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

chai.use(aligned);

module.exports = { aligned };
