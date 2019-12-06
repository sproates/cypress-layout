# cypress-layout
Verifies the position and dimensions of HTML elements on your page, for use with cypress.io.

You do this by describing the HTML elements relative to other elements on the page, or even the page itself. This builds up an overall on your page have not changed.

This is very much at an alpha stage, there may be bugs I have not spotted and gaps I have not forseen; any feedback is most welcome so either get me on slack or you are also more than welcome to raise an issue here.

### Prerequisites

You only need to have [Cypress.io](https://github.com/cypress-io/cypress) installed.

### Installing

In your command line interface (CLI) navigate to your project folder and run:

```
npm install cypress-layout
```

Once installed update `cypress/support/index.js` file to include:
```javascript
import 'cypress-layout'
```

Optionally, but recommended, you can add the following config values `config.roundLayoutValues = true` and `config.removePadding = true;` to `Cypress/plugins/index.js`:

```javascript
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.roundLayoutValues = true
  config.removePadding = true;
  return config
}
```
`roundLayoutValues` rounds all `px` and `%` values to the nearest whole number. The second config item `removePadding` informs the plugin whether you would like to calculate

### Getting started

The code snippets and examples relate to a BBC News article (e.g. https://www.bbc.co.uk/news/articles/c8xxl4l3dzeo).

To get started paste the following into a new file in `cypress/integration` and run it:

```javascript
describe('cypress-layout', () => {
  it('asserts left alignment', () => {
    cy.visit('https://www.bbc.com/pidgin');
    cy.viewport(1680, 1050);
    cy.get('nav > div > ul').should('be.leftAligned', '#root > header > div > div')
  });
});
```

### The assertions

The assertions should be used like any other [Cypress Assertion](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Assertions).

#### Alignment

```javascript
cy.get('element-selector')
  .should('be.topAligned', 'comparison-selector')
  .and('be.rightAligned', 'comparison-selector')
  .and('be.bottomAligned', 'comparison-selector')
  .and('be.bottomAligned', 'comparison-selector')
```

#### Position
```javascript
cy.get('element-selector')
  .should('be.leftOf', 'comparison-selector', pixels)
```
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
  is().centred(el.otherElement, 'horizontally');
  is().centred(el.otherElement, 'vertically');
```