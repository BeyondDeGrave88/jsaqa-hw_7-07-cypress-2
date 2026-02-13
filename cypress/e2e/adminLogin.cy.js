describe('Admin page login', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('Should login with valid data (happy path)', () => {
    cy.fixture('adminLogin').then((userData) => {
      cy.fixture('selectors').then((selectors) => {
        cy.login(userData.happy);
        cy.get(selectors.adminPage.hallControl).should('be.visible');
      });
    });
  });

  it('Should show error with invalid data (sad path)', () => {
    cy.fixture('adminLogin').then((userData) => {
      cy.fixture('selectors').then((selectors) => {
        cy.login(userData.sad);
        cy.contains(selectors.loginPage.errorMessage).should('be.visible');
      });
    });
  });
});
