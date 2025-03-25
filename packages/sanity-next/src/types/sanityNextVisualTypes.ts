import type { NextVisualProps } from "@react-visual/next";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityFileSource } from "@sanity/asset-utils";

export type SanityNextVisualProps = {
  image?: Captionable & SanityImageSource;
  video?: Captionable & SanityFileSource;
  alt?: string;
  src?: SanityVisualObject;
} & Omit<NextVisualProps, "image" | "video" | "alt">;

type SanityVisualObject = {
  image?: SanityImageSource;
  video?: SanityFileSource;
  alt?: string;
};

type Captionable = {
  alt?: string;
  title?: string;
  caption?: string;
};
