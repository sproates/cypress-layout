const comp = require('./compare');
const err = require('./err');

Cypress.Commands.add('isLeftAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'left').then((res) => {
  expect(res[0], res[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isRightAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'right').then((res) => {
  expect(res[0], res[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isTopAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'top').then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isBottomAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'bottom').then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isNotLeftAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'left').then((res) => {
  expect(res[0], res[1]).to.equal(false);
  return subject;
}));

Cypress.Commands.add('isNotRightAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'right').then((res) => {
  expect(res[0], res[1]).to.equal(false);
  return subject;
}));

Cypress.Commands.add('isNotTopAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'top').then((subj) => {
  expect(subj[0], subj[1]).to.equal(false);
  return subject;
}));

Cypress.Commands.add('isNotBottomAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'bottom').then((subj) => {
  expect(subj[0], subj[1]).to.equal(false);
  return subject;
}));

Cypress.Commands.add('isBelow', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.err.undefinedLength()) => comp.isPositioned(subject, 'below', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isAbove', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'above', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isLeftOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'left of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isRightOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'right of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isNotBelow', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'below', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isNotAbove', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'above', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isNotLeftOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'left of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isNotRightOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'right of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('hasWidthOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject, 'width', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('hasHeightOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject, 'height', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('doesNotHaveWidthOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject, 'width', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(false);
  return subject;
}));

Cypress.Commands.add('doesNotHaveHeightOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject, 'height', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(false);
  return subject;
}));

Cypress.Commands.add('isInside', { prevSubject: true }, (subject, element = err.undefinedElement(), expected = err.undefinedObject()) => comp.isInside(subject, element, expected).then((subj) => {
  expect(subj[0], subj[1]).to.equal(true);
  return subject;
}));

Cypress.Commands.add('isNotInside', { prevSubject: true }, (subject, element = err.undefinedElement(), expected = err.undefinedObject()) => comp.isInside(subject, element, expected).then((subj) => {
  expect(subj[0], subj[1]).to.equal(false);
  return subject;
}));

Cypress.Commands.add('waitFor', { prevSubject: false }, (element = err.undefinedElement()) => {
  cy.get(element);
});
