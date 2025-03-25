import { useState } from "react";
import { LazyVideo } from "../../src";

// Make an instance of LazyVideo that can be controlled
const Player = function ({ autoplay }: any) {
  const [paused, setPaused] = useState(!autoplay);

  return (
    <>
      <LazyVideo
        src="https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/300x200.mp4"
        alt=""
        paused={paused}
      />
      <div style={{ position: "relative" }}>
        <button onClick={() => setPaused(false)}>Play</button>
        <button onClick={() => setPaused(true)}>Pause</button>
      </div>
    </>
  );
};

describe("playback", () => {
  it("can be paused and then restarted", () => {
    cy.mount(<Player autoplay={true} />);
    cy.get("video").isPlaying();
    cy.get("button").contains("Pause").click();
    cy.get("video").isPaused();
    cy.get("button").contains("Play").click();
    cy.get("video").isPlaying();
  });

  it("can be started and then paused", () => {
    cy.mount(<Player autoplay={false} />);
    cy.get("video").isPaused();
    cy.get("button").contains("Play").click();
    cy.get("video").isPlaying();
    cy.get("button").contains("Pause").click();
    cy.get("video").isPaused();
  });
});

describe("responsive video", () => {
  it("supports switching sources based on media", () => {
    cy.mount(
      <LazyVideo
        src={{
          portrait:
            "https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/500x500.mp4#portrait",
          landscape:
            "https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/500x250.mp4#landscape",
        }}
        sourceMedia={["(orientation:landscape)", "(orientation:portrait)"]}
        videoLoader={({ src, media }) => {
          if (media?.includes("portrait")) return src.portrait;
          else return src.landscape;
        }}
        alt="Responsive video test"
      />,
    );

    // Portrait loaded initially
    cy.get("video").its("[0].currentSrc").should("contain", "portrait");

    // Switch to landscape
    cy.viewport(500, 250);
    cy.get("video").its("[0].currentSrc").should("contain", "landscape");

    // Switch back to portrait again
    cy.viewport(500, 600);
    cy.get("video").its("[0].currentSrc").should("contain", "portrait");
  });
});

describe("Accessibility controls", () => {
  it("renders ada controls by default", () => {
    cy.mount(
      <LazyVideo
        src="https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/300x200.mp4"
        alt="Accessibility controls test"
      />,
    );
    cy.get("button").should("have.css", "bottom");
    cy.get("button").and("have.css", "left");
  });

  it("controls affect playback", () => {
    const onPauseSpy = cy.spy().as("onPauseSpy");
    const onPlaySpy = cy.spy().as("onPlaySpy");

    cy.mount(
      <LazyVideo
        src="https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/300x200.mp4"
        alt="Accessibility controls test"
        onPause={onPauseSpy}
        onPlay={onPlaySpy}
      />,
    );

    cy.get("video").isPlaying();
    cy.get("[aria-label=Pause]").click();
    cy.get("video").isPaused();
    cy.get("[aria-label=Play]").click();
    cy.get("video").isPlaying(); // The second time

    cy.get("@onPauseSpy").should("have.been.calledOnce");
    cy.get("@onPlaySpy").should("have.been.calledTwice");
  });

  it("allows a different position to be set", () => {
    cy.mount(
      <LazyVideo
        src="https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/300x200.mp4"
        alt="Accessibility controls test"
        accessibilityControlsPosition="top right"
      />,
    );
    cy.get("[aria-label=Pause]").should("have.css", "top");
    cy.get("[aria-label=Pause]").and("have.css", "right");
  });

  it("allows the controls to be hidden", () => {
    cy.mount(
      <LazyVideo
        src="https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/300x200.mp4"
        alt="Accessibility controls test"
        hideAccessibilityControls
      />,
    );
    cy.get("[aria-label=Pause]").should("not.exist");
  });

  it("can have custom icons", () => {
    cy.mount(
      <LazyVideo
        src="https://github.com/BKWLD/react-visual/raw/refs/heads/main/packages/react/cypress/fixtures/300x200.mp4"
        alt="Accessibility controls test"
        playIcon={() => <span>Play</span>}
        pauseIcon={() => <span>Pause</span>}
      />,
    );
    cy.get("[aria-label=Pause]").contains("Pause");
  });
});
