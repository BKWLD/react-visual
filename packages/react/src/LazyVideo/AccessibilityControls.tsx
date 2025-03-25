import { LazyVideoProps } from "../types/lazyVideoTypes";
import type { CSSProperties, ReactNode } from "react";
import { PositionOption } from "../types/reactVisualTypes";

// How big to make the button.  Can't be too small and still be ADA friendly
// https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
const minAccessibleBtnSize = 24;

// How far from the edge to position the button
const positionGutter = "1em";

type AccessibilityControlsProps = Pick<
  LazyVideoProps,
  | "playIcon"
  | "pauseIcon"
  | "hideAccessibilityControls"
  | "accessibilityControlsPosition"
> & {
  isVideoPaused: boolean;
  play: () => void;
  pause: () => void;
};

// Adds a simple pause/play UI for accessibility use cases
export default function AccessibilityControls({
  play,
  pause,
  isVideoPaused,
  playIcon,
  pauseIcon,
  hideAccessibilityControls,
  accessibilityControlsPosition,
}: AccessibilityControlsProps): ReactNode {
  // If hidden, return nothing
  if (hideAccessibilityControls) return null;

  // Determine the icon to display
  const Icon = isVideoPaused ? playIcon || PlayIcon : pauseIcon || PauseIcon;

  return (
    <button
      onClick={isVideoPaused ? play : pause}
      aria-pressed={!isVideoPaused}
      aria-label={isVideoPaused ? "Play" : "Pause"}
      style={{
        // Clear default sizes
        appearance: "none",
        border: "none",
        lineHeight: 0,
        padding: 0,

        // Make it look clickable
        cursor: "pointer",

        // Position the button
        position: "absolute",
        ...makePosition(accessibilityControlsPosition),
      }}
    >
      <Icon />
    </button>
  );
}

// Make the styles for positioning the button
function makePosition(position: PositionOption = "bottom left"): CSSProperties {
  switch (position) {
    case "center":
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    case "left":
      return {
        top: "50%",
        left: positionGutter,
        transform: "translate(0, -50%)",
      };
    case "top left":
      return { top: positionGutter, left: positionGutter };
    case "top":
      return {
        top: positionGutter,
        left: "50%",
        transform: "translate(-50%, 0)",
      };
    case "top right":
      return { top: positionGutter, right: positionGutter };
    case "right":
      return {
        top: "50%",
        right: positionGutter,
        transform: "translate(0, -50%)",
      };
    case "bottom right":
      return { bottom: positionGutter, right: positionGutter };
    case "bottom":
      return {
        bottom: positionGutter,
        left: "50%",
        transform: "translate(-50%, 0)",
      };
    case "bottom left":
    default:
      return { bottom: positionGutter, left: positionGutter };
  }
}

function PauseIcon() {
  return (
    <svg
      width={minAccessibleBtnSize}
      height={minAccessibleBtnSize}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={iconStyle}
    >
      <rect x="6" y="4" width="4" height="16" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width={minAccessibleBtnSize}
      height={minAccessibleBtnSize}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={iconStyle}
    >
      <polygon points="9,4 19,12 9,20" fill="currentColor" />
    </svg>
  );
}

// Make the default icons white on a semi-transparent black background
// https://chatgpt.com/share/1050ddc4-5d2f-4a50-a5f6-623b7b679184
const iconStyle = {
  background: `rgba(0, 0, 0, 0.25)`,
  color: "white",
  borderRadius: "2px",
};
