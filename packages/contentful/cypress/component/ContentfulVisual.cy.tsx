import ContentfulVisual, {
  widthBasedImageLoader,
  widthBasedVideoLoader,
} from "../../src";
import {
  imageAsset,
  portraitImageAsset,
  videoAsset,
  portraitVideoAsset,
} from "../fixtures/assets";
import { visualEntry } from "../fixtures/entries";

// Dimensions
const VW = Cypress.config("viewportWidth"),
  VH = Cypress.config("viewportHeight"),
  landscapeAspect = imageAsset.width / imageAsset.height;

describe("no asset", () => {
  it("renders nothing", () => {
    cy.mount(
      <ContentfulVisual
        width={300}
        height={200}
        alt=""
        data-cy="next-visual"
      />,
    );
    cy.get("[data-cy=next-visual]").should("not.exist");
  });
});

describe("contentful asset props", () => {
  it("renders image", () => {
    cy.mount(<ContentfulVisual image={imageAsset} />);
    cy.get("img")
      .hasDimensions(VW, VW / landscapeAspect)
      .invoke("attr", "alt")
      .should("eq", imageAsset.title);
    cy.get("img").its("[0].currentSrc").should("contain", "w=640"); // srcset
  });

  it("can override inferred props", () => {
    cy.mount(<ContentfulVisual image={imageAsset} aspect={1} alt="Override" />);
    cy.get("img")
      .hasDimensions(VW, VW)
      .invoke("attr", "alt")
      .should("eq", "Override");
  });

  it("renders video", () => {
    cy.mount(<ContentfulVisual video={videoAsset} aspect={16 / 9} />);
    cy.get("video")
      .hasDimensions(VW, VW / (16 / 9))
      .invoke("attr", "aria-label")
      .should("eq", videoAsset.description);
  });
});

describe("contentful visual entry props", () => {
  it("renders orientation based responsive images", () => {
    cy.mount(
      <ContentfulVisual
        src={{
          ...visualEntry,
          video: null,
          portraitVideo: null,
        }}
      />,
    );

    // There should be no vidoes rendered
    cy.get("video").should("not.exist");

    // Portrait asset
    cy.get("img").hasDimensions(VW, VW);
    cy.get("img")
      .its("[0].currentSrc")
      .should("contain", "w=640")
      .should("contain", portraitImageAsset.url);

    // Landscape asset
    cy.viewport(500, 400);
    cy.get("img").hasDimensions(VW, VW / landscapeAspect);
    cy.get("img")
      .its("[0].currentSrc")
      .should("contain", "w=640")
      .should("contain", imageAsset.url);
  });

  it("renders orientation based responsive videos", () => {
    cy.mount(
      <ContentfulVisual
        expand
        src={{
          ...visualEntry,
          image: null,
          portraitImage: null,
        }}
      />,
    );

    // There should be no imgs rendered
    cy.get("img").should("not.exist");

    // Portrait asset
    cy.get("video")
      .its("[0].currentSrc")
      .should("contain", portraitVideoAsset.url);

    // Landscape asset
    cy.viewport(500, 400);
    cy.get("video").its("[0].currentSrc").should("contain", videoAsset.url);
  });

  it("renders full visual entry", () => {
    cy.mount(<ContentfulVisual src={visualEntry} />);

    // Portrait asset
    cy.get("img").hasDimensions(VW, VW);
    cy.get("img")
      .its("[0].currentSrc")
      .should("contain", portraitImageAsset.url);
    cy.get("video")
      .its("[0].currentSrc")
      .should("contain", portraitVideoAsset.url);

    // Landscape asset
    cy.viewport(500, 400);
    cy.get("img").hasDimensions(VW, VW / landscapeAspect);
    cy.get("img").its("[0].currentSrc").should("contain", imageAsset.url);
    cy.get("video").its("[0].currentSrc").should("contain", videoAsset.url);
  });

  it("finds alt on src image", () => {
    cy.mount(
      <ContentfulVisual
        src={{
          ...visualEntry,
          alt: null,
        }}
      />,
    );
    cy.get("img").invoke("attr", "alt").should("eq", "Landscape gradient");
  });

  it("finds alt on src video", () => {
    cy.mount(
      <ContentfulVisual
        src={{
          ...visualEntry,
          image: null,
          portraitImage: null,
          alt: null,
        }}
      />,
    );
    cy.get("video")
      .invoke("attr", "aria-label")
      .should("eq", "Background loop description");
  });

  it("renders width based responsive images", () => {
    cy.mount(
      <ContentfulVisual
        expand
        src={{
          ...visualEntry,
          video: null,
          portraitVideo: null,
        }}
        sourceMedia={["(min-width:400px)", "(max-width:399px)"]}
        imageLoader={widthBasedImageLoader}
      />,
    );

    // Portrait asset
    cy.viewport(399, 500);
    cy.get("img")
      .its("[0].currentSrc")
      .should("contain", portraitImageAsset.url);

    // Landscape asset
    cy.viewport(400, 500);
    cy.get("img").its("[0].currentSrc").should("contain", imageAsset.url);
  });

  it("renders width based responsive videos", () => {
    cy.mount(
      <ContentfulVisual
        expand
        src={{
          ...visualEntry,
          image: null,
          portraitImage: null,
        }}
        sourceMedia={["(min-width:400px)", "(max-width:399px)"]}
        videoLoader={widthBasedVideoLoader}
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
});
