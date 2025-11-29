describe("Home View", () => {
  const mobileSizes = ["iphone-6", "samsung-note9", "iphone-xr"];
  mobileSizes.forEach((size) => {
    it(`visits home page and should see play button on mobile size ${size}`, () => {
      cy.viewport(size);
      cy.visit("/");
      cy.contains("h1", "Playback Era");
      cy.contains("button", "Jogar").should("be.visible");
    });
  });
});
