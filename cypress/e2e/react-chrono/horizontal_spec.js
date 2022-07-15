/// <reference types="cypress" />

context('Chrono.Vertical.Basic', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/horizontal');
  });

  it('check length', () => {
    cy.get('.timeline-horz-item-container').should('have.length', 13);
  });

  it('check timeline controls', () => {
    cy.get('.timeline-controls').children().should('have.length', 5);
  });

  // it('check read more', () => {
  //   cy.get('.timeline-card-content').within(() => {
  //     cy.get('.card-description').should('have.class', 'show-less');
  //     cy.get('.show-more').click();
  //     cy.wait(400);
  //     cy.get('.card-description').should('not.have.class', 'show-less');
  //   });
  // });
});
