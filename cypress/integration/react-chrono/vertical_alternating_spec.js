/// <reference types="cypress" />

context('Chrono.Vertical.Alternating.Mixed', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/vertical-alternating-mixed');
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
        cy.get('.card-title').should('contain', 'Pearl Harbor');
        cy.get('.card-sub-title').should(
          'contain',
          'The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft',
        );
      });
  });

  it('check card title', () => {
    cy.get('.vertical-item-row')
      .eq(0)
      .find('.card-title')
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
      .find('.card-sub-title')
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
    // cy.scrollTo(700);
    cy.get('.vertical-item-row').eq(1).find('.show-more').click();
    cy.wait(500);
    cy.get('.vertical-item-row')
      .eq(1)
      .find('.card-description')
      .should('not.have.class', 'show-less');
  });

  it('check video', () => {
    cy.get('.vertical-item-row')
      .eq(2)
      .find('iframe')
      .should(
        'have.attr',
        'src',
        'https://www.youtube.com/embed/gPMgYC0sXos?enablejsapi=1',
      );
  });

  it('check video', () => {
    cy.get('.vertical-item-row')
      .eq(8)
      .find('video')
      .should('have.css', 'visibility', 'hidden');
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

  it('use nav controls', () => {
    cy.get('.timeline-controls>li').eq(3).click();
    cy.wait(700);
    cy.get('.vertical-item-row')
      .last()
      .find('.timeline-card-content')
      .should('have.class', 'active');

    cy.get('.timeline-controls>li').eq(0).click();
    cy.wait(700);
    cy.get('.vertical-item-row')
      .first()
      .find('.timeline-card-content')
      .should('have.class', 'active');

    cy.get('.timeline-controls>li').eq(2).click();
    cy.wait(250);
    cy.get('.timeline-controls>li').eq(2).click();
    cy.wait(250);
    cy.get('.timeline-controls>li').eq(2).click();
    cy.wait(250);
    cy.get('.timeline-controls>li').eq(2).click();
    cy.wait(250);
    cy.get('.vertical-item-row')
      .eq(4)
      .find('.timeline-card-content')
      .should('have.class', 'active');

    cy.get('.timeline-controls>li').eq(1).click();
    cy.get('.vertical-item-row')
      .eq(3)
      .find('.timeline-card-content')
      .should('have.class', 'active');
  });
});
