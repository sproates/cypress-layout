const comp = require('./compare');
const err = require('./err');

Cypress.Commands.add('LeftAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject[0], element, 'left').then((res) => {
  expect(res[0], res[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('RightAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject[0], element, 'right').then((res) => {
  expect(res[0], res[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('TopAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject[0], element, 'top').then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('BottomAlignedWith', { prevSubject: true }, (subject, element = err.undefinedElement()) => comp.isAlignedWith(subject[0], element, 'bottom').then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('Below', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject[0], 'below', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('Above', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject[0], 'above', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('LeftOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject[0], 'left of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('RightOf', { prevSubject: true }, (subject, element = err.undefinedElement(), length = err.undefinedLength()) => comp.isPositioned(subject[0], 'right of', element, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('WidthOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject[0], 'width', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('HeightOf', { prevSubject: true }, (subject, length = err.undefinedLength(), relativeTo) => comp.dimensionRelativeTo(subject[0], 'height', relativeTo, length).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('Inside', { prevSubject: true }, (subject, element = err.undefinedElement(), expected = err.undefinedObject()) => comp.isInside(subject[0], element, expected).then((subj) => {
  expect(subj[0], subj[1]).to.equal(subject[1]);
  return subject[0];
}));

Cypress.Commands.add('is', { prevSubject: true }, subject => [subject, true]);

Cypress.Commands.add('isnot', { prevSubject: true }, subject => [subject, false]);
