describe("Play View", () => {
  beforeEach(() => {
    cy.viewport("samsung-note9");
  });

  it("playing game should work on happy path", () => {
    const playlistID = "1234";
    cy.intercept(
      "GET",
      `http://localhost:3000/list-playlist-songs/${playlistID}`,
      { fixture: "response-from-tracks-api.json" },
    );
    cy.visit(`/play?playlist=${playlistID}`);

    // should have controller for game
    cy.contains("Rodada 1 de 10");
    cy.contains("Em que ano essa música foi lançada?");

    // should have `add here` buttons before and after initial song
    cy.get(".music-card").should("have.length", 3);
    cy.get(".music-card").then((items) => {
      expect(items[0]).to.contain.text("Adicionar aqui");
      expect(items[2]).to.contain.text("Adicionar aqui");
    });
  });
});
