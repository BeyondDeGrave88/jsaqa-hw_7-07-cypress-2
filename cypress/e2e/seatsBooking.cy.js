describe('Booking seats', () => {
  let movieTitle;

  beforeEach(() => {
    cy.visit('/admin');
    cy.fixture('adminLogin').then((userData) => {
      cy.login(userData.happy);
      cy.fixture('selectors').then((selectors) => {
        cy.get(selectors.adminPage.filmId)
          .find(selectors.adminPage.filmTitle)
          .invoke('text')
          .then((text) => {
            movieTitle = text.trim();
            cy.log(`Название фильма из админки: ${movieTitle}`);
          });
      });
    });
  });

  it('Should choose movie from administration and book seat on main page', () => {
    expect(movieTitle).to.not.be.empty;

    cy.visit('/');

    cy.fixture('selectors').then((selectors) => {
      cy.fixture('seats').then((seatsData) => {
        cy.get(selectors.mainPage.nextDay).click();

        cy.contains(selectors.bookingPage.movieTitle, movieTitle)
          .should('be.visible')
          .closest('.movie')
          .within(() => {
            cy.get(selectors.bookingPage.sessionTime).first().click();
          });

        const row = seatsData.seat.row;
        const seat = seatsData.seat.seat;
        const seatSelector = selectors.bookingPage.seat.replace('{row}', row).replace('{seat}', seat);

        cy.get(seatSelector).click();

        cy.contains(selectors.bookingPage.acceptButton, 'Забронировать').click();
      });

      cy.get(selectors.bookingPage.bookingTitle).should('be.visible').and('contain', 'Вы выбрали');
      cy.get(selectors.bookingPage.bookingFilmTitle).should('be.visible').and('contain', movieTitle);
    });
  });
});
