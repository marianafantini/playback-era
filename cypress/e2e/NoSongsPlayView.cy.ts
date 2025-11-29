describe('Play view View', () => {
  const mobileSizes = ['iphone-6', 'samsung-note9', 'iphone-xr'];
  mobileSizes.forEach((size) => {
    beforeEach(() => {
      cy.viewport(size);
      const playlistID = `1234`;
      cy.intercept(
        'GET',
        `http://localhost:3000/list-playlist-songs/${playlistID}`,
        { items: [] },
      ).as('list-playlist-songs');
    });

    it(`should show "no songs" message if response is empty for mobile ${size}`, () => {
      const playlistID = `1234`;
      cy.visit(`/play?playlist=${playlistID}`);
      cy.wait('@list-playlist-songs');
      cy.contains('Não encontramos músicas para jogar com essa playlist');
    });
  });
});
