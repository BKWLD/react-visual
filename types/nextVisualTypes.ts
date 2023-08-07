import type { ImageProps } from 'next/image'

export type NextVisualProps = {
	image?: string
} & Omit<ImageProps, "src">
