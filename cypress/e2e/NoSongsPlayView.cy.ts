describe('Play View', () => {
  it('should show "no songs" message if response is empty', () => {
    cy.intercept('GET', 'https://api.spotify.com/v1/playlists/playlistID/tracks', { items: [] })
    cy.visit('/play?playlist=playlistID')
    cy.contains('Não encontramos músicas para jogar nessa playlist')
  })

  it('should show "no songs" message if response contains only podcasts and no songs', () => {
    cy.intercept('GET', 'https://api.spotify.com/v1/playlists/playlistID/tracks', { fixture: 'tracks-only-podcast.json' })
    cy.visit('/play?playlist=playlistID')
    cy.contains('Não encontramos músicas para jogar nessa playlist')
  })
})
