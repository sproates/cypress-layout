function undefinedLength() {
  throw new Error('Please enter a distance');
}

function undefinedElement() {
  throw new Error('Please enter an element to compare');
}

function undefinedObject() {
  throw new Error('Please enter the dimensions you want to compare, e.g. { top: \'20px\', left: \'20px\' }');
}

module.exports = { undefinedLength, undefinedElement, undefinedObject };
