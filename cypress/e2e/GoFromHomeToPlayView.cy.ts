describe('Go from Home View to Play View', () => {
  const mobileSizes = ['iphone-6', 'samsung-note9', 'iphone-xr'];
  mobileSizes.forEach((size) => {
    beforeEach(() => {
      cy.intercept('GET', `http://localhost:3000/list-playlists`, {
        fixture: 'response-from-list-playlists.json',
      }).as('list-playlists');

      const playlistID = `03AbqFipgaR95FS1mBeNYS`;
      cy.intercept(
        'GET',
        `http://localhost:3000/list-playlist-songs/${playlistID}`,
        { fixture: 'response-from-tracks-api.json' },
      ).as('list-playlist-songs');
    });

    it(`visits home page and should see play button on mobile size ${size}`, () => {
      cy.viewport(size);
      cy.visit('/');
      cy.contains('h1', 'Playback Era');
      cy.contains('button', 'Jogar').should('be.visible').click();

      cy.url().should('include', '/select-playlist');
      cy.wait('@list-playlists');

      cy.get('.playlist-card').then((items) => {
        items[0].click();
      });

      cy.url().should('include', '/play?playlist=03AbqFipgaR95FS1mBeNYS');

      cy.wait('@list-playlist-songs');
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

      cy.wait(1000);

      cy.get('@willRemoveNewItem').then((willRemoveNewItem) => {
        if (willRemoveNewItem) {
          cy.get('.music-card').then((items) => {
            expect(items.length).to.equal(3);
          });
        } else {
          cy.get('.music-card').then((items) => {
            expect(items.length).to.equal(5);
          });
        }
      });
    });
  });
});
