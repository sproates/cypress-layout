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
