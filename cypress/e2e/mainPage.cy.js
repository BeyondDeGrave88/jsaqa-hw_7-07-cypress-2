describe('Main page visibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should show correct number of days', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.mainPage.days).should('have.length', selectors.mainPage.expectedDaysCount);
    });
  });

  it('Should be visible "Идем в кино"', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.mainPage.title).should('have.text', selectors.mainPage.expectedTitleText);
    });
  });
});
