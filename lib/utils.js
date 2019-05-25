export function getPositionEdges(direction) {
  switch (direction) {
    case 'left of':
      return ['right', 'left', true];
    case 'right of':
      return ['left', 'right', false];
    case 'above':
      return ['bottom', 'top', true];
    case 'below':
      return ['top', 'bottom', false];
    default:
      throw new Error('Please pass a valid direction');
  }
}

export function getKeyByValue(object, value) {
  const returnKey = Object.keys(object).find(key => object[key] === value);
  if (!returnKey) {
    return value;
  }
  return returnKey;
}

export function signSubtract(minuend, subtrahend, sign = false) {
  // eslint-disable-next-line max-len
  return (sign && (Math.abs(minuend - subtrahend) > 0) ? -(minuend - subtrahend) : minuend - subtrahend);
}

export const getParent = subject => subject.parent();
