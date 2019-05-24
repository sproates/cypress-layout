import { isAlignedWith, isPositioned, dimensionRelativeTo, isInside, getParent } from './commands-helpers'

//We may not need to return the sybject - need to check this
Cypress.Commands.add('isLeftAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => {
  return isAlignedWith(subject, element, 'left').then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isRightAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => {
  return isAlignedWith(subject, element, 'right').then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isTopAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => {
  return isAlignedWith(subject, element, 'top').then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isBottomAlignedWith', { prevSubject: true }, (subject, element = undefinedElement()) => {
  return isAlignedWith(subject, element, 'bottom').then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isBelow', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => {
  return isPositioned(subject, 'below', element, length).then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isAbove', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => {
  return isPositioned(subject, 'above', element, length).then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isLeftOf', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => {
  return isPositioned(subject, 'left of', element, length).then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isRightOf', { prevSubject: true }, (subject, element = undefinedElement(), length = undefinedLength()) => {
  return isPositioned(subject, 'right of', element, length).then( subject => {
    return subject;
  });
});

Cypress.Commands.add('hasWidthOf', { prevSubject: true }, (subject, length = undefinedLength(), relativeTo = getParent(subject)) => {
  return dimensionRelativeTo(subject, 'width', relativeTo, length).then( subject => {
    return subject;
  });
});

Cypress.Commands.add('hasHeightOf', { prevSubject: true }, (subject, length = undefinedLength(), relativeTo = getParent(subject)) => {
  return dimensionRelativeTo(subject, 'height', relativeTo, length).then( subject => {
    return subject;
  });
});

Cypress.Commands.add('isInside', { prevSubject: true }, (subject, element = undefinedElement(), expected = undefinedObject()) => {
  isInside(subject, element, expected).then( subject => {
  return subject;  
  });
});


Cypress.Commands.add('hasAspectRatio', { prevSubject: true }, (expected) => {
  hasAspectRatio(subject, expected).then( subject => {
    return subject;
  });
});

Cypress.Commands.add('waitFor', { prevSubject: false }, (element = undefinedElement()) => {
  cy.get(element);
});
