import { el } from './index';
import { getRects } from './rects';
import { parseValue, parseObj } from './parse';
import {
  getPositionEdges, getKeyByValue, signSubtract,
} from './utils';

export const isAlignedWith = (subject, element, edge) => getRects(subject, element).then((rects) => {
  compareEdge(subject, element, edge, rects[0], rects[1]);
  return subject;
});

export const isPositioned = (subject, direction, element, length) => getRects(subject, element).then((rects) => {
  const msg = `${getKeyByValue(el, subject.selector)} is ${direction} ${getKeyByValue(el, element)}`;
  const [minuend, subtrahend] = [rects[0], rects[1]];
  const [minuendEdge, subtrahendEdge, sign] = getPositionEdges(direction);
  expect(signSubtract(minuend[minuendEdge], subtrahend[subtrahendEdge], sign), msg).to.equal(parseValue(length)[0]);
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
  // const parsedExp = parseObj(expected);
  expect(getRectDiff(rects[0], rects[1], expected), `${getKeyByValue(el, subject.selector)} is inside ${getKeyByValue(el, element)}`).to.deep.equal(parseObj(expected));
  return subject;
});


function getDimensionPercent(dividend, divisor, dimension) {
  return Math.round((dividend[dimension] / divisor[dimension]) * 100);
}


function compareEdge(subject, element, direction, actual, expected) {
  expect(actual[direction], `${getKeyByValue(el, subject.selector)} is ${direction} aligned with ${getKeyByValue(el, element)}`).to.equal(expected[direction]);
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
