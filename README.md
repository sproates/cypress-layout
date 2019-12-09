# cypress-layout
Largely inspired by the [Galen Framework](http://galenframework.com/), `cypress-layout` verifies the position and dimensions of elements on your page, for use with cypress.io.

This is very much at an alpha stage, there may be bugs I have not spotted and gaps I have not forseen; any feedback is most welcome so either get me on slack or you are also more than welcome to raise an issue here.

### Prerequisites

You need to have [Cypress.io](https://github.com/cypress-io/cypress) installed.

### Installing

In your command line interface (CLI) navigate to your project folder and run:

```
npm install @david-boydell/cypress-layout
```

Once installed update `cypress/support/index.js` file to include:
```javascript
import '@david-boydell/cypress-layout'
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

To get started paste the following into a new file in `cypress/integration` and run it:

```javascript
describe('Getting started with cypress-layout', () => {
  it('asserts left alignment', () => {
      cy.visit('https://www.bbc.com/pidgin');
      cy.viewport(1680, 1050);
      cy.get('nav').should('be.leftAligned', 'main');
  });
});
```

Let's add something that will fail, add the following line under `cy.get('nav')...`

```javascript
cy.get('nav').should('be.leftAligned', '#root > main > div > div > section:nth-child(1)');
```
If you run that again you should see the following error:

> CypressError: Timed out retrying: expected nav to be left aligned with #root > main > div > div > section:nth-child(1)

You may also have noticed that the test took longer. Cypress will retest the assertion until either the test passes or the timeout is reached.

Let's change the assertion so that our test all pass, update the line to be:

```javascript
cy.get('nav').should('not.be.leftAligned', '#root > main > div > div > section:nth-child(1)');
```

Following is a list of all the available layout assertions. 

### The assertions

The assertions should be used like any other [Cypress Assertion](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Assertions).

#### Alignment

Tests alignment with another element.

Assertion | Params | Example
--- | --- | ---
`topAligned` | `{string} element-selector` | `.should('be.topAligned', 'selector')`
`rightAligned` | `{string} element-selector` | `.should('be.rightAligned', 'selector')`
`bottomAligned` | `{string} element-selector` | `.should('be.bottomAligned', 'selector')`
`leftAligned` | `{string} element-selector` | `.should('be.leftAligned', 'selector')`


#### Position

Tests whether an element is positioned relative to another element.

Assertion | Params | Example
--- | --- | ---
`rightOf` | `{string} element-selector, {int} pixels` | `.should('be.rightOf', 'selector', 16)`
`leftOf` | `{string} element-selector, {int} pixels` | `.should('be.be.leftOf', 'selector', 16)`
`above` | `{string} element-selector, {int} pixels` | `.should('be.above', 'selector', 16)`
`below`| `{string} element-selector, {int} pixels` | `.should('be.below', 'selector', 16)`

#### Proportions

Test the dimensions of elements. You can check either the absolute dimensions using e.g. `width` or test the proportions relative to *another* element using e.g. `widthOf`

Assertion | Params | Example
--- | --- | ---
`width` | `{int} pixels` | `.should('have.width', 100)`
`height` | `{int} pixels` | `.should('have.height', 100)`
`widthOf` | `{string} element-selector, {float} percent` | `.should('have.widthOf', 'selector', 1) // 100% width`
`heightOf`| `{string} element-selector, {float} percent` | `.should('have.heightOf', 'selector', 0.5) // 50% height`

#### Containing

There are two *versions* of `inside`.

The first accepts just a selector for an element, in this case the assertion is just to verify that the element is *inside* the other **regardless of the dimensions**.

The second accepts an object that can contain one to four properties: `top`, `right`, `bottom` and/or `left`. For example, if you wanted to test that your logo image was inside the header element with 10px clearance at the top and bottom, and 20px from the left handside you would supply e.g. `{ top: 10, bottom: 10, left: 20 }`; you can supply them in any order.

Assertion | Params | Example
--- | --- | ---
`inside` | `{string} element-selector` | `.should('be.inside', 100)`
`inside` | `{string} element-selector, {object} { top: {int}, right: {int}, bottom: {int}, left: {int} }` | `.should('be.inside', 'selector', { top: 10, right: 10, bottom: 10, left: 10 })` 
`centred` | `{string} element-selector` | `.should('be.centred', 'selector')`
`centred` | `{string} element-selector, {string} axis` | `.should('be.centred', 'selector', 'horizontally')`

A couple of notes on `centred`. The assertion accepts an optional parameter `axis`, this is either 'vertically' or 'horizontally' - the assertion defaults to 'vertically'. The assertion also checks that the element is fully ***inside*** the one within which it should be centred - if it is not inside your test will fail with the error will be that the element is not inside the other (rather than not being centred)

### Just a head's up!

If you want to work with elements that are added *post-loaded* ( i.e. added to page **after** it loads) you need to `cy.get` it before attempting any layout checks. A good example of this is the cookie banner on the article page https://www.bbc.co.uk/news/articles/ce9992y0reyo, the following test will fail:

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
