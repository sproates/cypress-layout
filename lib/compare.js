import { getRects, getRectDiff } from './rects';
import {
  getPositionEdges, getKeyByValue, signSubtract, getParent,
} from './utils';
import { parseValue, parseObj } from './parse';
import el from '../cypress/support/elements';

function compareEdge(subject, element, direction, actual, expected) {
  const msg = `${getKeyByValue(el, subject.selector)} is ${direction} aligned with ${getKeyByValue(el, element)}`;
  expect(actual[direction], msg).to.equal(expected[direction]);
}

export const isAlignedWith = (subject, element, edge) => getRects(subject, element)
  .then((rects) => {
    const msg = `${getKeyByValue(el, subject.selector)} is ${edge} aligned with ${getKeyByValue(el, element)}`;
    // compareEdge(subject, element, edge, rects[0], rects[1]);
    return [rects[0][edge] === rects[1][edge], msg];
  });

export const isPositioned = (subject, direction, element, length) => getRects(subject, element)
  .then((rects) => {
    const msg = `${getKeyByValue(el, subject.selector)} is ${direction} ${getKeyByValue(el, element)}`;
    const [minuend, subtrahend] = [rects[0], rects[1]];
    const [minuendEdge, subtrahendEdge, sign] = getPositionEdges(direction);
    expect(signSubtract(minuend[minuendEdge], subtrahend[subtrahendEdge], sign), msg)
      .to.equal(parseValue(length)[0]);
    return subject;
  });

export const isInside = (subject, element, expected) => getRects(subject, element).then((rects) => {
  const msg = `${getKeyByValue(el, subject.selector)} is inside ${getKeyByValue(el, element)}`;
  expect(getRectDiff(rects[0], rects[1], expected), msg).to.deep.equal(parseObj(expected));
  return subject;
});

function getDimensionPercent(dividend, divisor, dimension) {
  return Math.round((dividend[dimension] / divisor[dimension]) * 100);
}

export const dimensionRelativeTo = (subj, dimension, relativeTo = getParent(subj), length) => {
  const parsedVal = parseValue(length);
  const msg = `${getKeyByValue(el, subj.selector)} has ${dimension} of ${parsedVal[0] + parsedVal[1]}`;
  let actual;
  return getRects(subj, relativeTo).then((rects) => {
    const [dividend, divisor] = rects;
    if (parsedVal[1] === '%') {
      actual = getDimensionPercent(dividend, divisor, dimension);
    } else {
      actual = dividend[dimension];
    }
    expect(actual, msg).to.equal(parsedVal[0]);
    return subj;
  });
};
