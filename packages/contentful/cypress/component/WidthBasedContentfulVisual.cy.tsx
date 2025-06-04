import { WidthBasedVisual } from "../../src";
import {
  imageAsset,
  portraitImageAsset,
  videoAsset,
  portraitVideoAsset,
} from "../fixtures/assets";
import { visualEntry } from "../fixtures/entries";

// Dimensions
const landscapeAspect = imageAsset.width / imageAsset.height;

describe("contentful visual entry props", () => {
  it("renders width based responsive images", () => {
    cy.mount(
      <WidthBasedVisual
        src={{
          ...visualEntry,
          video: null,
          portraitVideo: null,
        }}
        // Test number type support
        breakpoint={399}
      />,
    );

    // Portrait asset
    cy.viewport(399, 500);
    cy.get("img").hasDimensions(399, 399);
    cy.get("img")
      .its("[0].currentSrc")
      .should("contain", portraitImageAsset.url);

    // Landscape asset
    cy.viewport(400, 500);
    cy.get("img").hasDimensions(400, 400 / landscapeAspect);
    cy.get("img").its("[0].currentSrc").should("contain", imageAsset.url);
  });

  it("renders width based responsive videos", () => {
    cy.mount(
      <WidthBasedVisual
        expand
        src={{
          ...visualEntry,
          image: null,
          portraitImage: null,
        }}
        // Test string type support
        breakpoint="399px"
      />,
    );

    // Portrait asset
    cy.viewport(399, 500);
    cy.get("video")
      .its("[0].currentSrc")
      .should("contain", portraitVideoAsset.url);

    // Landscape asset
    cy.viewport(400, 500);
    cy.get("video").its("[0].currentSrc").should("contain", videoAsset.url);
  });

  it("handles same video asset for both portrait and landscape with width-based breakpoints", () => {
    // This test simulates using the same Contentful video asset for both portrait and landscape
    // in the width-based responsive setup
    cy.mount(
      <WidthBasedVisual
        expand
        src={{
          ...visualEntry,
          image: null,
          portraitImage: null,
          // Use the same video asset for both small and large screens
          video: videoAsset,
          portraitVideo: videoAsset,
        }}
        breakpoint="399px"
      />,
    );

    // Small screen (should use portraitVideo, but it's the same asset)
    cy.viewport(399, 500);
    cy.get("video").its("[0].currentSrc").should("contain", videoAsset.url);

    // Large screen (should use video, same asset)
    cy.viewport(400, 500);
    cy.get("video").its("[0].currentSrc").should("contain", videoAsset.url);

    // Switch back to small screen
    cy.viewport(399, 500);
    cy.get("video").its("[0].currentSrc").should("contain", videoAsset.url);
  });
});
