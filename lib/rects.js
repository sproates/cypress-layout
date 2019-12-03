function getRects(first, second) {
  const actual = getRect(first);
  const expected = getRect(second);
  return [actual, expected];
}

const defaultDiffObj = {
  top: null, right: null, bottom: null, left: null,
};

function getRectDiff(minuend, subtrahend, expected = defaultDiffObj) {
  const difference = Object.assign({}, expected);
  Object.keys(difference).forEach((key) => {
    if (key === 'bottom' || key === 'right') {
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

function getActual(calc) {
  if (Cypress.config('roundLayoutValues')) return Math.round(calc());
  return calc();
}

module.exports = {
  getRectDiff, getRects, getRect, getActual,
};
