# cypress-layout
Verifies the position and dimensions of HTML elements on your page, for use with cypress.io.

You do this by describing the HTML elements relative to other elements on the page, or even the page itself. This builds up an overall on your page have not changed.

This is very much at an alpha stage, there may be bugs I have not spotted and gaps I have not forseen; any feedback is most welcome so either get me on slack or you are also more than welcome to raise an issue here.

### Prerequisites

You only need to have [Cypress.io](https://github.com/cypress-io/cypress) installed.

### Installing

In your command line interface (CLI) navigate to your project and run:

```
npm install cypress-layout
```

Once installed update `cypress/support/index.js` file to include:
```javascript
import 'cypress-layout'
```

Optionally, but recommended, you can add `config.roundLayoutValues = true` to `Cypress/plugins/index.js`:

```javascript
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.roundLayoutValues = true
  return config
}
```

Dealing with fractions of pixels is like playing on Hard mode. This setting rounds all `px` values to the nearest whole number.

### Getting started

The code snippets and examples relate to a BBC News article (e.g. https://www.bbc.co.uk/news/articles/c8xxl4l3dzeo).

To get started paste the following into a new file in `cypress/integration`:

```javascript
describe('Getting started with cypress-layout', () => {
  it('gets started', () => {
    cy.viewport(1680, 1050);
    cy.visit('https://www.bbc.co.uk/news/articles/c8xxl4l3dzeo');
    cy.get('figure img').is().leftAlignedWith('h1');
  });
});
```

### The commands

All the commands that check positioning should be 'chained' from a `cy.get` command.

```javascript
cy.get(el.headline).is().below(el.header, '0px');
```

Commands can be chained together, for convenience: 

```javascript
cy.get(el.headline).is().below(el.header, '0px').is().leftAlignedWith(el.headline);

// Or, for better readability you could do the following

cy.get(el.headline)
  .is().below(el.header, '0px')
  .is().leftAlignedWith(el.headline);
```

You can also chain normal Cypress commands from them:

```javascript
cy.get(el.headline)
  .is().below(el.header, '0px')
  .is().leftAlignedWith(el.headline)
  .should('contain', '\'Breech\' baby scan would save lives');
```

And that's basically it. Below you can find a reference of all the commands available to you.

### Just a head's up!

If you want to work with elements that are added to page after it loads you need to `cy.get` it before attempting any layout checks. A good example of this is the cookie banner on the article page https://www.bbc.co.uk/news/articles/ce9992y0reyo, the following test will fail:

```javascript
it('tests the header', () => {
  cy.get(el.header)
    .isBelow(el.cookieBanner, '0px')
});
```

This is because the x, y co-ordinates of the header *and* the cookieBanner are `0, 0`. You need to have the test set up as follows for this to pass.

```javascript
it('tests the header', () => {
  cy.get(el.cookieBanner) // This needs to be called first
  cy.get(el.header)
    .isBelow(el.cookieBanner, '0px')
});
```

### Selectors

To help make the tests more readable you can define the selectors we want to use in a separate object outside the tests themselves. This means that instead of seeing `#root > main > div > div:nth-child(2) > time` in the test we see something ike `el.timestamp`. To get started, paste the following into the new file in `cypress/support/` e.g. `cypress/support/elements.js`:

```javascript
export const el = {
  document: '&document'
}
```

We'll come to the `&document` object later on. To add a new element to use in a test you need to enter a new line in the format `elementName: 'css selector as a string',` (don't forget the comma).

Here's an example of adding the first few elements we want to check:

```javascript
// I'll admit the benefits of these are marginal at best - but you get the idea!
export const el = {
  document: '&document',
  header: 'header',
  headline: 'h1',
  img: 'figure img',
}
```

The first word in this declaration is `export`. This makes it available to be picked up by other files. Every test file we create in the `integration/'` folder should start with `import { el } from '../support/elements'` on the first line. This makes the names to use throughout our tests consistent.

If you want to use a different file, just create the file with a `.js` extension and change the `import` statement to be `import { el } from '../support/[YOUR-FILENAME-HERE]'`.

#### The '&document'

The `&document` is a special element, it represents the boundaries of the page. It's useful, for example, when testing that the header is the very first element on the page and the footer is the very last.

## The full list of commands

Below is a list of the commands you can use.

### is(), isnot(), has(), hasnot()

You need to prefix every layout command with either `is()`, `isnot()`, `has()` or `hasnot()`.

### Alignment

```javascript
cy.get(el.element)
  .is().leftAlignedWith(el.otherElement);
  .is().rightAlignedWith(el.otherElement);
  .is().topAlignedWith(el.otherElement);
  .is().bottomAlignedWith(el.otherElement);
```

### Positioning

```javascript
cy.get(el.element)
  .is().above(el.otherElement, '20px');
  .is().below(el.otherElement, '20px');
  .is().leftOf(el.otherElement, '20px');
  .is().rightOf(el.otherElement, '20px');
```

### Size

```javascript
cy.get(el.element)
  .has().widthOf('20px');
  .has().widthOf('50%', el.otherElement);
  .has().heightOf('20px');
  .has().heightOf('50%', el.otherElement);
```

### Inside

```javascript
cy.get(el.element)
  is().inside(el.otherElement, { top: '20px', bottom: : '20px', left: '20px', right: '20px' });
```