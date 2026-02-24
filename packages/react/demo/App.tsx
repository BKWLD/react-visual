import React from "react";
import { createRoot } from "react-dom/client";
import ReactVisual from "../src/ReactVisual";
import LazyVideo from "../src/LazyVideo";
import VisualWrapper from "../src/VisualWrapper";

function App() {
  return (
    <div className="container">
      <h1>@react-visual/react Demo</h1>
      <p className="subtitle">
        Interactive examples of the ReactVisual component library
      </p>

      {/* ReactVisual with Image */}
      <div className="demo-section">
        <h2>ReactVisual - Image Examples</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>
              Basic Image with <code>aspect</code>
            </h3>
            <div className="visual-container">
              <ReactVisual
                image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                aspect={16 / 9}
                alt="Mountain landscape"
              />
            </div>
          </div>

          <div className="demo-item">
            <h3>
              Image with <code>fit="contain"</code>
            </h3>
            <div className="visual-container">
              <ReactVisual
                image="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800"
                aspect={1}
                fit="contain"
                alt="Dog portrait"
              />
            </div>
          </div>

          <div className="demo-item">
            <h3>Image with explicit dimensions</h3>
            <div className="visual-container">
              <ReactVisual
                image="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800"
                width={400}
                height={300}
                alt="Forest"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ReactVisual with Video */}
      <div className="demo-section">
        <h2>ReactVisual - Video with Poster</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Video with Image Poster</h3>
            <div className="visual-container">
              <ReactVisual
                video="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
                aspect={16 / 9}
                alt="Video with poster"
              />
            </div>
          </div>

          <div className="demo-item">
            <h3>Video without Poster</h3>
            <div className="visual-container">
              <ReactVisual
                video="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                aspect={16 / 9}
                noPoster
                alt="Video without poster"
              />
            </div>
          </div>
        </div>
      </div>

      {/* VisualWrapper */}
      <div className="demo-section">
        <h2>VisualWrapper - Layout Container</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Custom Content in Wrapper</h3>
            <VisualWrapper aspect={16 / 9}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Custom Content
              </div>
            </VisualWrapper>
          </div>

          <div className="demo-item">
            <h3>Square Aspect Ratio</h3>
            <VisualWrapper aspect={1}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                1:1
              </div>
            </VisualWrapper>
          </div>
        </div>
      </div>

      {/* Props Examples */}
      <div className="demo-section">
        <h2>Advanced Props Examples</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>
              With <code>expand</code> prop
            </h3>
            <div style={{ position: "relative", height: "200px" }}>
              <ReactVisual
                image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
                expand
                alt="Stars"
              />
            </div>
          </div>

          <div className="demo-item">
            <h3>
              With <code>className</code> and <code>style</code>
            </h3>
            <div className="visual-container">
              <ReactVisual
                image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"
                aspect={16 / 9}
                className="custom-class"
                style={{ border: "4px solid #667eea", borderRadius: "8px" }}
                alt="Nature"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
