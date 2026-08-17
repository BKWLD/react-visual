import { VisualWrapper } from "../../src";

// Shared props
const sharedProps = {
  style: { background: "black", color: "white" },
  className: "wrapper",
};

// Viewport sizes
const VW = Cypress.config("viewportWidth"),
  VH = Cypress.config("viewportHeight");

describe("fixed size", () => {
  it("integer values", () => {
    cy.mount(<VisualWrapper {...sharedProps} width={300} height={200} />);
    cy.get(".wrapper").hasDimensions(300, 200);
  });

  it("string values", () => {
    cy.mount(<VisualWrapper {...sharedProps} width={"300"} height={"200"} />);
    cy.get(".wrapper").hasDimensions(300, 200);
  });

  it("percentage values", () => {
    cy.mount(<VisualWrapper {...sharedProps} width={"100%"} height={"50vh"} />);
    cy.get(".wrapper").hasDimensions(VW, VH / 2);
  });
});

it("expands", () => {
  cy.mount(<VisualWrapper {...sharedProps} expand />);
  cy.get(".wrapper").hasDimensions(VW, VH);
});

it("supports aspect", () => {
  cy.mount(<VisualWrapper {...sharedProps} aspect={2 / 1} />);
  cy.get(".wrapper").hasDimensions(VW, VH / 2);
});

it("supports respponsive aspect function", () => {
  cy.mount(
    <VisualWrapper
      {...sharedProps}
      image={{
        landscape: {
          aspect: 2,
        },
        portrait: {
          aspect: 1,
        },
      }}
      sourceMedia={["(orientation: landscape)", "(orientation: portrait)"]}
      aspect={({ image, media }) => {
        return media?.includes("landscape")
          ? image.landscape.aspect
          : image.portrait.aspect;
      }}
    />,
  );
  cy.viewport(500, 400);
  cy.get(".wrapper").hasDimensions(500, 250);
  cy.viewport(400, 500);
  cy.get(".wrapper").hasDimensions(400, 400);
});

it("generates CSS classes using useId() for responsive aspects", () => {
  cy.mount(
    <VisualWrapper
      {...sharedProps}
      image={{
        landscape: {
          aspect: 2,
        },
        portrait: {
          aspect: 1,
        },
      }}
      sourceMedia={["(orientation: landscape)", "(orientation: portrait)"]}
      aspect={({ image, media }) => {
        return media?.includes("landscape")
          ? image.landscape.aspect
          : image.portrait.aspect;
      }}
    />,
  );
  
  // Check that a single CSS class is generated using useId format
  cy.get(".wrapper").should(($wrapper) => {
    const className = $wrapper.attr("class") || "";
    const classes = className.split(/\s+/).filter(cls => cls !== "wrapper");
    
    // Should have exactly one generated class for responsive aspects
    expect(classes.length).to.equal(1);
    
    // The class should be a useId generated class (not the old rv-* format)
    const responsiveClass = classes[0];
    expect(responsiveClass).to.not.be.empty;
    expect(responsiveClass).to.not.start.with("rv-");
    
    // Should NOT have the old bespoke format classes starting with rv-
    const oldFormatClasses = classes.filter(cls => 
      cls.startsWith("rv-") && (cls.includes("landscape") || cls.includes("portrait"))
    );
    expect(oldFormatClasses.length).to.equal(0);
  });
  
  // Verify that a style tag was created with the responsive CSS
  cy.get("style").should("exist").and("contain", "aspect-ratio");
});

it("supports children", () => {
  cy.mount(
    <VisualWrapper {...sharedProps}>
      <h1>Hey</h1>
    </VisualWrapper>,
  );
  cy.get("h1").contains("Hey");
});
