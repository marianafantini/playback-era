describe('Play View', () => {
  const mobileSizes = ['iphone-6', 'samsung-note9', 'iphone-xr'];
  mobileSizes.forEach((size) => {
    it('playing game should work on happy path', () => {
      cy.viewport(size);
      const playlistID = '1234';
      cy.intercept(
        'GET',
        `http://localhost:3000/list-playlist-songs/${playlistID}`,
        {fixture: 'response-from-tracks-api.json'},
      ).as('list-playlist-songs');

      cy.visit(`/play?playlist=${playlistID}`);

      cy.wait('@list-playlist-songs');

      // should have controller for game
      cy.contains('Rodada 1 de 10');
      cy.contains('Em que ano essa música foi lançada?');

      Array.from({length: 10}, () => {
        cy.get('.music-card').then((items) => {
          items[0].click();
        });

        cy.wait(150); // eslint-disable-line cypress/no-unnecessary-waiting

        cy.get('.music-card').then((items) => {
          expect(items[1]).to.satisfy(($el) => {
            const classList = Array.from($el.classList);
            return (
              classList.includes('correct-item') ||
              classList.includes('remove-item')
            );
          });
        });
      });

      cy.get('.win-header-message').contains('Parabéns!!');
      cy.get('.win-header-message').contains('Você acertou');

      cy.get('.button-actions').contains('Jogar de novo');
      cy.get('.button-actions').contains('Trocar de playlist');
    });
  });
});
