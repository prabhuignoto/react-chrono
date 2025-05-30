/// <reference types="cypress" />

context('Chrono.Horizontal.Basic', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4444/horizontal');
  });

  it('check length', () => {
    cy.get('.timeline-horz-item-container').should('have.length', 10);
  });
});
