import { signSubtract } from './utils';

export function getRect(selector) {
  if (selector === '&document') {
    return cy.document().then(doc => doc.documentElement.getBoundingClientRect());
  } if (typeof selector === 'string') {
    return cy.get(selector, { log: false }).then($elem => $elem[0].getBoundingClientRect());
    // assume DOM elem
  }
  return cy.wrap(selector, { log: false }).then(elem => Cypress.$(elem)[0].getBoundingClientRect());
}

export function getRects(first, second) {
  return getRect(first).then((actual) => {
    getRect(second).then(expected => [actual, expected]);
  });
}

export function getRectDiff(minuend, subtrahend, expected) {
  const difference = Object.assign({}, expected);
  Object.keys(difference).forEach((key) => {
    if ((key === 'bottom' && subtrahend[key] > 0) || (key === 'right' && subtrahend[key] > 0)) {
      difference[key] = signSubtract(minuend[key], subtrahend[key], true);
    } else {
      difference[key] = signSubtract(minuend[key], subtrahend[key]);
    }
  });
  return difference;
}
