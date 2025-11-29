describe("Home View", () => {
  beforeEach(() => {
    cy.viewport("samsung-note9");
  });

  it("visits home page and should see login with spotify button", () => {
    cy.visit("/");
    cy.contains("h1", "Playback Era");
    cy.contains("button", "Jogar");
  });
});
