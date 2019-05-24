export function parseValue(val) {
  const errMsg = `Please enter a valid value in % or px. ${val} is not considered valid.`;
  let qty;
  let units;
  if (typeof val === 'string') {
    if (!val.match(/^(-?\d*(?:\.\d*)?)(%|px)$/)) {
      // for cases where users leave out px or %
      try {
        [qty, units] = (val.match(/^(-?\d*(?:\.\d*)?)$/)).slice(1, 2).concat('px');
      } catch (error) {
        throw new Error(errMsg);
      }
    } else {
      [qty, units] = (val.match(/^(-?\d*(?:\.\d*)?)(%|px)$/)).slice(1, 3);
    }
  } else if (typeof val === 'number') {
    [qty, units] = [val, 'px'];
  } else {
    throw new Error(errMsg);
  }
  if (Cypress.config('roundLayoutValues')) { qty = Math.round(qty); }
  return [qty, units];
}

export function parseDiff(expected) {
  const difference = Object.assign({}, expected);
  Object.keys(difference).forEach((key) => {
    // eslint-disable-next-line prefer-destructuring
    console.log(difference[key]);
    difference[key] = parseValue(difference[key])[0];
  });
  return difference;
}
