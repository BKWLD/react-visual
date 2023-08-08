import type { ImageProps } from 'next/image'

// Make the placeholder props that next/image uses
export function makeImagePlaceholder(
  placeholderData: ImageProps['blurDataURL']
): Pick<ImageProps, 'placeholder' | 'blurDataURL'> | null {
  if (!placeholderData) return null
  return {
    placeholder: 'blur',
    blurDataURL: placeholderData,
  }
}
