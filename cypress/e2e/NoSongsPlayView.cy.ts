describe('Play View', () => {
  it('should show "no songs" message if response is empty', () => {
    const playlistID = "1234"
    cy.intercept('GET', `http://localhost:3000/list-playlist-songs/${playlistID}`, { items: [] })
    cy.visit(`/play?playlist=${playlistID}`)
    cy.contains('Não encontramos músicas para jogar com essa playlist')
  })

  it('should show "no songs" message if response contains only podcasts and no songs', () => {
    const playlistID = "1234"
    cy.intercept('GET', `http://localhost:3000/list-playlist-songs/${playlistID}`, { fixture: 'tracks-only-podcast.json' })
    cy.visit(`/play?playlist=${playlistID}`)
    cy.contains('Não encontramos músicas para jogar com essa playlist')
  })
})
