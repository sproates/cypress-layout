import {
  isAlignedWith, isPositioned, dimensionRelativeTo, isInside, getParent,
} from './commands-helpers';

const undefinedLength = () => {
  throw new Error('Please enter a distance');
};

const undefinedElement = () => {
  throw new Error('Please enter an element to compare');
};

const undefinedObject = () => {
  throw new Error('Please enter the dimensions you want to compare, e.g. { top: \'20px\', left: \'20px\' }');
};

Cypress.Commands.add('isLeftAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => isAlignedWith(subject, element, 'left').then(subj => subj));

Cypress.Commands.add('isRightAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => isAlignedWith(subject, element, 'right').then(subj => subj));

Cypress.Commands.add('isTopAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => isAlignedWith(subject, element, 'top').then(subj => subj));

Cypress.Commands.add('isBottomAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => isAlignedWith(subject, element, 'bottom').then(subj => subj));

Cypress.Commands.add('isBelow', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => isPositioned(subject, 'below', element, length).then(subj => subj));

Cypress.Commands.add('isAbove', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => isPositioned(subject, 'above', element, length).then(subj => subj));

Cypress.Commands.add('isLeftOf', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => isPositioned(subject, 'left of', element, length).then(subj => subj));

Cypress.Commands.add('isRightOf', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => isPositioned(subject, 'right of', element, length).then(subj => subj));

Cypress.Commands.add('hasWidthOf', { prevSubject: true }, (subject, length = undefinedLength(), relativeTo = getParent(subject)) => dimensionRelativeTo(subject, 'width', relativeTo, length).then(subj => subj));

Cypress.Commands.add('hasHeightOf', { prevSubject: true }, (subject, length = undefinedLength(), relativeTo = getParent(subject)) => dimensionRelativeTo(subject, 'height', relativeTo, length).then(subj => subj));

Cypress.Commands.add('isInside', { prevSubject: true }, (subject, element = undefinedElement(), expected = undefinedObject()) => {
  isInside(subject, element, expected).then(subj => subj);
});

// Cypress.Commands.add('hasAspectRatio', { prevSubject: true }, (expected) => {
//   hasAspectRatio(subject, expected).then(subj => subj);
// });

Cypress.Commands.add('waitFor', { prevSubject: false }, (element = undefinedElement()) => {
  cy.get(element);
});
