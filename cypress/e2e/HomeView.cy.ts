describe('Home View', () => {
  it('visits home page and should see login with spotify button', () => {
    cy.visit('/')
    cy.contains('h1', 'Playback Era')
    cy.contains('button', 'Login with Spotify')
  })
})
