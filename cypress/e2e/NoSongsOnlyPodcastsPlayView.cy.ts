describe('Play View', () => {
  const mobileSizes = ['iphone-6', 'samsung-note9', 'iphone-xr'];
  mobileSizes.forEach((size) => {
    beforeEach(() => {
      cy.viewport(size);
      const playlistID = `1234`;
      cy.intercept(
        'GET',
        `http://localhost:3000/list-playlist-songs/${playlistID}`,
        { fixture: 'tracks-only-podcast.json' },
      ).as('list-playlist-songs');
    });

    it(`should show "no songs" message if response only contains podcasts for mobile ${size}`, () => {
      const playlistID = `1234`;
      cy.visit(`/play?playlist=${playlistID}`);
      cy.wait('@list-playlist-songs');
      cy.contains('Não encontramos músicas para jogar com essa playlist');
    });
  });
});
