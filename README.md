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

Once installed update `Cypress/support/index.js` file to include:
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

## Getting started

If you're new to either Cypress or Mocha check out the Getting Started section on the wiki. If you're comfortable with both then you can probably dive straight in and have a look at the commands below. The code snippets and examples relate to a BBC News article (e.g. https://www.bbc.co.uk/news/articles/ce9992y0reyo).

### Selectors

To help make the tests more readable you can define the selectors we want to use in our tests in a separate bit of code outside the tests themselves. This means that instead of seeing `#root > main > div > div:nth-child(2) > time` in the test we see something ike `el.timestamp`. to get started, paste the following into `support/index.js`:

```javascript
export const el = {
  viewport: 'viewport'
}
```

We'll come to the `viewport` object later on. To add a new element to use in a test you need to enter a new line in the format `elementName: 'css selector as a string',` (don't forget the comma). The element name has to be one word, followed by a colon, followed by the element selector as a `string`.

Here's an example of adding the article header from https://www.bbc.co.uk/news/articles/ce9992y0reyo:

```javascript
export const el = {
  viewport: 'viewport',
  header: 'header',
}
```

The first word in this declaration is `export`. This makes it available to be picked up by other files. Every test file we create in the `integration/'` folder should start with `import { el } from '../support/index'` on the first line. This makes the names to use throughout our tests consistent.

If you want to use a different file, just create the file with a `.js` extension and change the `import` statement to be `import { el } from '../support/[YOUR-FILENAME-HERE'`.

#### The 'viewport'

The viewport is a special object, it represents the boundaries of the page. It's useful, for example, when testing that the header is the first element on the page and the footer is the very last.

### The commands

All the commands that check positioning should be 'chained' from a `cy.get` command.

```javascript
cy.get(el.headline).isBelow(el.header, '0px');
```

Commands can be chained together, for convenience: 

```javascript
cy.get(el.headline).isBelow(el.header, '0px').isLeftAlignedWith(el.headline);

// Or, for better readability you could do the following - just make sure the semi-colon comes at the end of the whole list, rather than at the end of each line:

cy.get(el.headline)
  .isBelow(el.header, '0px')
  .isLeftAlignedWith(el.headline);
```

You can also chain normal Cypress commands from them:

```javascript
cy.get(el.headline)
  .isBelow(el.header, '0px')
  .isLeftAlignedWith(el.headline)
  .should('contain', '\'Breech\' baby scan would save lives');
```

And that's basically it. Below you can find a reference of all the commands available to you.

### A word of warning

Because of the way Cypress works, if you want to work with elements that are added to page after it loads you need to `cy.get` it before attempting any layout checks. A good example of this is the cookie banner on the article page https://www.bbc.co.uk/news/articles/ce9992y0reyo, the following test will fail:

```javascript
it('tests the header', () => {
  cy.get(el.header)
    .isBelow(el.cookieBanner, '0px')
});
```

This is because the x, y co-ordinates of the header *and* the cookieBanner are `0, 0`. You need to have the test set up as follows for this to pass.

```javascript
it('tests the header', () => {
  cy.get(el.cookieBanner)
  cy.get(el.header)
    .isBelow(el.cookieBanner, '0px')
});
```

## Alignment

##

## Contributing


