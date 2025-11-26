describe('Play View', () => {
  it('playing game should work on happy path', () => {
    cy.intercept('GET', 'https://api.spotify.com/v1/playlists/playlistID/tracks', { fixture: 'response-from-tracks-api.json' })
    cy.visit('/play?playlist=playlistID')

    // should have controller for game
    cy.contains('Rodada 1 de 10')
    cy.contains('Ouça e descubra o ano!')

    // should have `add here` buttons before and after initial song
    cy.get('.music-card').should('have.length', 3)
    cy.get('.music-card').then((items) => {
      expect(items[0]).to.contain.text('Adicionar aqui');
      expect(items[2]).to.contain.text('Adicionar aqui');
    });
  })
})
