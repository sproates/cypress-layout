const comp = require('./compare');
const err = require('./err');

Cypress.Commands.add('leftAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'left').then((res) => {
  expect(res[0], res[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('rightAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'right').then((res) => {
  expect(res[0], res[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('topAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'top').then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('bottomAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject, element, 'bottom').then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('below', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'below', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('above', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'above', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('leftOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'left of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('rightOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject, 'right of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('widthOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject, 'width', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('heightOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject, 'height', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('inside', { prevSubject: true }, (subject, element = err.undefinedElement(), expected = err.undefinedObject()) => comp.isInside(subject, element, expected).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('is', { prevSubject: true }, subject => [subject, true]);

Cypress.Commands.add('isnot', { prevSubject: true }, subject => [subject, false]);

Cypress.Commands.add('has', { prevSubject: true }, subject => [subject, true]);

Cypress.Commands.add('hasnot', { prevSubject: true }, subject => [subject, false]);
