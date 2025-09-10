import type { ReactVisualProps } from "@react-visual/react";

export type ContentfulVisualProps = {
  image?: ContentfulImageAsset | null;
  video?: ContentfulAsset | null;
  src?: ContentfulVisualEntry | null;
  alt?: string | null; // Can be inferrerd
} & Omit<ReactVisualProps, "alt" | "image" | "video">;

export type ContentfulImageAsset = ContentfulAsset & {
  width?: number | null;
  height?: number | null;
};

export type ContentfulAsset = {
  title?: string | null;
  description?: string | null;
  fileName?: string;
  url?: string | null;
};

export type ContentfulVisualEntry = {
  image?: ContentfulImageAsset | null;
  portraitImage?: ContentfulImageAsset | null;
  video?: ContentfulAsset | null;
  portraitVideo?: ContentfulAsset | null;
  alt?: string | null;
};
