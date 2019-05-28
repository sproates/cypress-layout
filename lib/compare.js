const equal = require('deep-equal');
const rect = require('./rects');
const utils = require('./utils');
const parse = require('./parse');

const isAlignedWith = (subject, element, edge) => rect.getRects(subject, element)
  .then((rects) => {
    const msg = `${subject.selector} is ${subject[1] ? '' : ' not '} ${edge} aligned with ${element}`;
    return [rects[0][edge] === rects[1][edge], msg];
  });

const isPositioned = (subject, direction, element, len) => rect.getRects(subject, element)
  .then((rects) => {
    const msg = `${subject.selector} is ${subject[1] ? '' : ' not '} ${direction} ${element}`;
    const [min, subtra] = [rects[0], rects[1]];
    const [minEdge, subtraEdge, sign] = utils.getPositionEdges(direction);
    // eslint-disable-next-line max-len
    return [utils.signSubtract(min[minEdge], subtra[subtraEdge], sign) === parse.parseValue(len)[0], msg];
  });

const isInside = (subject, element, expected) => rect.getRects(subject, element).then((rects) => {
  const msg = `${subject.selector} is ${subject[1] ? '' : ' not '} inside ${element}`;
  return [equal(rect.getRectDiff(rects[0], rects[1], expected), parse.parseObj(expected)), msg];
});

function getDimensionPercent(dividend, divisor, dimension) {
  return Math.round((dividend[dimension] / divisor[dimension]) * 100);
}

const dimensionRelativeTo = (subj, dimension, relativeTo = utils.getParent(subj), length) => {
  const parsedVal = parse.parseValue(length);
  const msg = `${subj.selector} ${subject[1] ? 'has a' : ' does not have a'} ${dimension} of ${parsedVal[0] + parsedVal[1]}`;
  let actual;
  return rect.getRects(subj, relativeTo).then((rects) => {
    const [dividend, divisor] = rects;
    if (parsedVal[1] === '%') {
      actual = getDimensionPercent(dividend, divisor, dimension);
    } else {
      actual = dividend[dimension];
    }
    return [actual === parsedVal[0], msg];
  });
};

module.exports = {
  isAlignedWith, isPositioned, isInside, dimensionRelativeTo,
};
