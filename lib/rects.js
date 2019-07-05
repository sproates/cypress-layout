const utils = require('./utils');

function getRect(selector) {
  if (selector === '&document') {
    return cy.document().then(doc => doc.documentElement.getBoundingClientRect());
  } if (typeof selector === 'string') {
    return cy.get(selector, { log: false }).then($elem => $elem[0].getBoundingClientRect());
  }
  return cy.wrap(selector, { log: false }).then(elem => Cypress.$(elem)[0].getBoundingClientRect());
}

function getRects(first, second) {
  return getRect(first).then((actual) => {
    getRect(second).then(expected => [actual, expected]);
  });
}

function getRectDiff(minuend, subtrahend, expected) {
  const difference = Object.assign({}, expected);
  Object.keys(difference).forEach((key) => {
    if ((key === 'bottom' && subtrahend[key] > 0) || (key === 'right' && subtrahend[key] > 0)) {
      difference[key] = utils.signSubtract(minuend[key], subtrahend[key], true);
    } else {
      difference[key] = utils.signSubtract(minuend[key], subtrahend[key]);
    }
  });
  return difference;
}

module.exports = { getRect, getRects, getRectDiff };
