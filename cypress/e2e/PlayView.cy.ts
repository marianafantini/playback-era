describe('Play View', () => {
  const mobileSizes = ['samsung-note9'];
  mobileSizes.forEach((size) => {
    it('playing game should work on happy path', () => {
      cy.viewport(size);
      const playlistID = '1234';
      cy.intercept(
        'GET',
        `http://localhost:3000/list-playlist-songs/${playlistID}`,
        { fixture: 'response-from-tracks-api.json' },
      ).as('list-playlist-songs');

      cy.visit(`/play?playlist=${playlistID}`);

      cy.wait('@list-playlist-songs');

      // should have controller for game
      cy.contains('Rodada 1 de 10');
      cy.contains('Em que ano essa música foi lançada?');

      // should have `add here` buttons before and after initial song
      cy.get('.music-card').should('have.length', 3);
      cy.get('.music-card').then((items) => {
        expect(items[0]).to.contain.text('Adicionar aqui');
        expect(items[2]).to.contain.text('Adicionar aqui');
      });

      // add music to first position
      cy.get('.music-card').then((items) => {
        items[0].click();
      });

      cy.wait(150);

      cy.get('.music-card').then((items) => {
        expect(items[1]).to.satisfy(($el) => {
          const classList = Array.from($el.classList);
          console.log('will remove: ', classList.includes('remove-item'));
          const willRemoveNewItem = classList.includes('remove-item');
          cy.wrap(willRemoveNewItem).as('willRemoveNewItem');

          return (
            classList.includes('correct-item') ||
            classList.includes('remove-item')
          );
        });
      });

      cy.get('@willRemoveNewItem').then((willRemoveNewItem) => {
        if (willRemoveNewItem) {
          cy.get('.music-card').then((items) => {
            console.log('3 items');
            expect(items.length).to.equal(3);
          });
        } else {
          cy.get('.music-card').then((items) => {
            console.log('5 items');
            expect(items.length).to.equal(5);
          });
        }
      });
    });
  });
});
