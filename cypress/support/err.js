export function undefinedLength() {
  throw new Error('Please enter a distance');
}

export function undefinedElement() {
  throw new Error('Please enter an element to compare');
}

export function undefinedObject() {
  throw new Error('Please enter the dimensions you want to compare, e.g. { top: \'20px\', left: \'20px\' }');
}
