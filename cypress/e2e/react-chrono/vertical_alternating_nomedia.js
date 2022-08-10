/// <reference types="cypress" />

context('Chrono.Vertical.Alternating', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/vertical-alternating');
  });

  it('check length', () => {
    cy.get('.vertical-item-row').should('have.length', 13);
  });

  it('check card elements', () => {
    cy.get('.vertical-item-row').first().children().should('have.length', 3);
  });

  it('check timeline title for first item', () => {
    cy.get('.vertical-item-row>div').eq(1).last().should('contain', 'May 1940');
  });

  it('check timeline card contents', () => {
    cy.get('.vertical-item-row')
      .eq(3)
      .find('.timeline-card-content')
      .within(() => {
        cy.get('.rc-card-title').should('contain', 'Pearl Harbor');
        cy.get('.rc-card-subtitle').should(
          'contain',
          'The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft',
        );
      });
  });

  it('check card title', () => {
    cy.get('.vertical-item-row')
      .eq(0)
      .find('.rc-card-title')
      .should('contain', 'Dunkirk');
  });

  it('check card description', () => {
    cy.get('.vertical-item-row')
      .eq(0)
      .find('.card-description>p')
      .should(
        'contain',
        'On 10 May 1940, Hitler began his long-awaited offensive in the west',
      );
  });

  it('check card sub title', () => {
    cy.get('.vertical-item-row')
      .eq(1)
      .find('.rc-card-subtitle')
      .should('contain', 'RAF Spitfire pilots scramble for their planes');
  });

  it('check card active', () => {
    cy.get('.vertical-item-row')
      .eq(1)
      .find('.timeline-card-content')
      .click()
      .should('have.class', 'active');
  });

  it('check read more action', () => {
    cy.get('.vertical-item-row')
      .eq(1)
      .find('.card-description')
      .should('have.class', 'show-less');
    cy.get('.vertical-item-row').eq(1).find('.show-more').click();
    cy.wait(500);
    cy.get('.vertical-item-row')
      .eq(1)
      .find('.card-description')
      .should('not.have.class', 'show-less');
  });

  it('check scroll', () => {
    cy.get('.timeline-main-wrapper').scrollTo('bottom');
    cy.wait(1000);
    cy.get('.vertical-item-row')
      .last()
      .find('.card-content-wrapper')
      .should('have.class', 'visible');

    cy.get('.timeline-main-wrapper').scrollTo('top');
    cy.wait(1000);
    cy.get('.vertical-item-row')
      .first()
      .find('.card-content-wrapper')
      .should('have.class', 'visible');
  });
});
