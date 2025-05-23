// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Modern custom command example using cy.intercept()
// Cypress.Commands.add('interceptApiCall', (method, url, alias) => {
//   cy.intercept(method, url).as(alias);
// });

// Example of a custom command for testing React components
// Cypress.Commands.add('getByDataTestId', (testId) => {
//   return cy.get(`[data-testid="${testId}"]`);
// });

// Example of a custom command for accessibility testing
// Cypress.Commands.add('checkA11y', (context, options) => {
//   cy.injectAxe();
//   cy.checkA11y(context, options);
// });

// TypeScript support for custom commands
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       interceptApiCall(method: string, url: string, alias: string): Chainable<Element>;
//       getByDataTestId(testId: string): Chainable<Element>;
//       checkA11y(context?: any, options?: any): Chainable<Element>;
//     }
//   }
// }
