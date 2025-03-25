import type { ReactNode } from "react";
import type { ReactVisualProps } from "./reactVisualTypes";

export type VisualWrapperProps = Pick<
  ReactVisualProps,
  | "expand"
  | "width"
  | "height"
  | "aspect"
  | "sourceMedia"
  | "image"
  | "video"
  | "className"
  | "style"
> & {
  dataAttributes?: object;
  children?: ReactNode;
};
