import deepEqual from 'deep-equal';
import { getRects, getRectDiff } from './rects';
import {
  getPositionEdges, signSubtract, getParent,
} from './utils';
import { parseValue, parseObj } from './parse';

export const isAlignedWith = (subject, element, edge) => getRects(subject, element)
  .then((rects) => {
    const msg = `${subject.selector} is ${edge} aligned with ${element}`;
    return [rects[0][edge] === rects[1][edge], msg];
  });

export const isPositioned = (subject, direction, element, len) => getRects(subject, element)
  .then((rects) => {
    const msg = `${subject.selector} is ${direction} ${element}`;
    const [min, subtra] = [rects[0], rects[1]];
    const [minEdge, subtraEdge, sign] = getPositionEdges(direction);
    return [signSubtract(min[minEdge], subtra[subtraEdge], sign) === parseValue(len)[0], msg];
  });

export const isInside = (subject, element, expected) => getRects(subject, element).then((rects) => {
  const msg = `${subject.selector} is inside ${element}`;
  return [deepEqual(getRectDiff(rects[0], rects[1], expected), parseObj(expected)), msg];
});

function getDimensionPercent(dividend, divisor, dimension) {
  return Math.round((dividend[dimension] / divisor[dimension]) * 100);
}

export const dimensionRelativeTo = (subj, dimension, relativeTo = getParent(subj), length) => {
  const parsedVal = parseValue(length);
  const msg = `${subj.selector} has ${dimension} of ${parsedVal[0] + parsedVal[1]}`;
  let actual;
  return getRects(subj, relativeTo).then((rects) => {
    const [dividend, divisor] = rects;
    if (parsedVal[1] === '%') {
      actual = getDimensionPercent(dividend, divisor, dimension);
    } else {
      actual = dividend[dimension];
    }
    return [actual === parsedVal[0], msg];
  });
};
