Cypress.Commands.add('login', (user) => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.loginPage.emailInput).type(user.email);
    cy.get(selectors.loginPage.passwordInput).type(user.password);
    cy.contains(selectors.loginPage.submitButton).click();
  });
});

Cypress.Commands.add('bookTicket', (movie, row, seat) => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.bookingPage.movieSelect).select(movie);

    cy.contains(selectors.bookingPage.hall, 'Зал 1').find(`${selectors.bookingPage.seat}[data-row="${row}"][data-seat="${seat}"]`).click();

    cy.contains(selectors.bookingPage.acceptButton, 'Забронировать').click();
  });
});
