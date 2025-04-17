/// <reference types="cypress" />

context('Chrono.Search', () => {
  const searchInput = '[data-testid="timeline-search-input"]';
  const timelineItem = '[data-testid="vertical-item-row"]';
  const cardTitle = '[data-testid="timeline-card-title"]';
  const cardSubtitle = '[data-testid="timeline-card-subtitle"]';
  const cardContent = '[data-testid="timeline-card-content"]';

  beforeEach(() => {
    cy.visit('http://localhost:4444/vertical-basic');
    cy.get(timelineItem).should('have.length.at.least', 1);
  });

  it('should have search input in toolbar', () => {
    cy.get(searchInput)
      .should('exist')
      .and('have.attr', 'placeholder', 'Search by title, subtitle...');
  });

  it('should find items by title and keep it visible', () => {
    cy.get(searchInput).type('Dunkirk');
    cy.wait(500);

    cy.get(timelineItem).first().find(cardTitle).should('contain', 'Dunkirk');
  });

  it('should find items by subtitle and keep it visible', () => {
    cy.get(searchInput).type('RAF Spitfire');
    cy.wait(500);

    cy.get(timelineItem)
      .eq(1)
      .find(cardSubtitle)
      .should('contain', 'RAF Spitfire pilots scramble for their planes');
  });

  it('should find items by detailed text and keep it visible', () => {
    cy.get(searchInput).type('Pearl Harbor');
    cy.wait(500);

    cy.get(timelineItem)
      .eq(3)
      .find(cardTitle)
      .should('contain', 'Pearl Harbor');
  });

  it('should clear search and show all items', () => {
    cy.get(searchInput).type('Dunkirk');
    cy.wait(500);
    cy.get(searchInput).clear();
    cy.wait(500);
    cy.get(timelineItem).should('have.length', 13);
  });

  it('should handle case-insensitive search and keep item visible', () => {
    cy.get(searchInput).type('dunkirk');
    cy.wait(500);

    cy.get(timelineItem).first().find(cardTitle).should('contain', 'Dunkirk');
  });

  it('should handle partial matches and keep item visible', () => {
    cy.get(searchInput).type('Dunk');
    cy.wait(500);

    cy.get(timelineItem).first().find(cardTitle).should('contain', 'Dunkirk');
  });
});
