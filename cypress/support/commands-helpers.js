import { el } from './index';
import { getRects } from './rects';
import { parseValue, parseDiff } from './parse';

export const isAlignedWith = (subject, element, edge) => getRects(subject, element).then((rects) => {
  compareEdge(subject, element, edge, rects[0], rects[1]);
  return subject;
});

export const isPositioned = (subject, direction, element, length) => getRects(subject, element).then((rects) => {
  const msg = `${getKeyByValue(el, subject.selector)} is ${direction} ${getKeyByValue(el, element)}`;
  const [minuend, subtrahend] = [rects[0], rects[1]];
  const [minuendEdge, subtrahendEdge, sign] = getPositionEdges(direction);
  expect(subtract(minuend[minuendEdge], subtrahend[subtrahendEdge], sign), msg).to.equal(parseValue(length)[0]);
  return subject;
});

export const dimensionRelativeTo = (subject, dimension, relativeTo, length) => {
  let parsedVal; let
    actual;
  parsedVal = parseValue(length);
  return getRects(subject, relativeTo).then((rects) => {
    const [dividend, divisor] = rects;
    if (parsedVal[1] === '%') {
      actual = getDimensionPercent(dividend, divisor, dimension);
    } else {
      actual = dividend[dimension];
    }
    expect(actual, `${getKeyByValue(el, subject.selector)} has ${dimension} of ${parsedVal[0] + parsedVal[1]}`).to.equal(parsedVal[0]);
    return subject;
  });
};

export const isInside = (subject, element, expected) => getRects(subject, element).then((rects) => {
  expect(getRectDiff(rects[0], rects[1], expected), `${getKeyByValue(el, subject.selector)} is inside ${getKeyByValue(el, element)}`).to.deep.equal(expected);
  return subject;
});

export const getParent = subject => subject.parent();

function getDimensionPercent(dividend, divisor, dimension) {
  return Math.round((dividend[dimension] / divisor[dimension]) * 100);
}

function getPositionEdges(direction) {
  switch (direction) {
    case 'left of':
      return ['right', 'left', true];
    case 'right of':
      return ['left', 'right', false];
    case 'above':
      return ['bottom', 'top', true];
    case 'below':
      return ['top', 'bottom', false];
  }
}

function compareEdge(subject, element, direction, actual, expected) {
  expect(actual[direction], `${getKeyByValue(el, subject.selector)} is ${direction} aligned with ${getKeyByValue(el, element)}`).to.equal(expected[direction]);
}

function getKeyByValue(object, value) {
  const key = Object.keys(object).find(key => object[key] === value);
  if (!key) {
    return value;
  }
  return key;
}

function getElement(obj) {
  if (Object.prototype.toString.call(obj) == '[object Object]') {
    var element = obj.get(0).getBoundingClientRect();
  } else if (Object.prototype.toString.call(obj) == '[object String]') {
    var element = Cypress.$(obj)[0].getBoundingClientRect();
  }
  return element;
}

function subtract(minuend, subtrahend, sign = false) {
  return (sign && (Math.abs(minuend - subtrahend) > 0) ? -(minuend - subtrahend) : minuend - subtrahend);
}

function parseAllToInt(rect) {
  const newRect = JSON.parse(JSON.stringify(rect));
  for (const key in newRect) {
    newRect[key] = parseInt(newRect[key], 10);
  }
  return newRect;
}

const undefinedLength = () => {
  throw new Error('Please enter a distance');
};

const undefinedElement = () => {
  throw new Error('Please enter an element to compare');
};

const undefinedObject = () => {
  throw new Error('Please enter the dimensions you want to compare, e.g. { top: \'20px\', left: \'20px\' }');
};

export function getRectDiff(minuend, subtrahend, expected) {
  const difference = Object.assign({}, expected);
  Object.keys(difference).forEach((key) => {
    if ((key === 'bottom' && subtrahend[key] > 0) || (key === 'right' && subtrahend[key] > 0)) {
      difference[key] = subtract(minuend[key], subtrahend[key], true);
    } else {
      difference[key] = subtract(minuend[key], subtrahend[key]);
    }
  });
  const diff = parseDiff(difference);
  return diff;
}
