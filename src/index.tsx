import * as React from 'react'

import Image from './Image'
import Video from './Video'

export interface Props {
  alt?: string
  aspectRatio?: string
  autoPlay?: boolean
  background?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  children?: React.ReactNode
  controls?: boolean
  height?: Number
  immediate?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  poster?: string
  rootMargin?: string
  src: string
  srcSet?: Array<string>
  type: string
  width?: Number
}

export default class Visual extends React.PureComponent<Props> {
  private paddingBottom: React.CSSProperties | undefined

  public static defaultProps: Partial<Props> = {
    autoPlay: true,
    background: 'cover',
    controls: false,
    immediate: false,
    rootMargin: '0px 0px -200px 0px',
    loop: true,
    muted: true,
    playsInline: true
  }

  constructor (props: Props) {
    super(props)

    const { aspectRatio, width, height } = props

    this.paddingBottom = undefined

    if (aspectRatio || (width && height)) {
      this.paddingBottom = aspectRatio
        ? this.calculateAspect(aspectRatio)
        : this.calculateAspect(`${height}:${width}`)
    }
  }

  private calculateAspect (
    aspectRatio: string
  ): React.CSSProperties | undefined {
    if (aspectRatio) {
      const [width, height] = aspectRatio.split(':')
      return { paddingBottom: `${(+height / +width) * 100}%` }
    }

    return undefined
  }

  public render () {
    const { type, children } = this.props

    return (
      <div
        style={{
          ...this.paddingBottom,
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {type === 'image' && (
          <Image {...this.props}>
            {children && children}
          </Image>
        )}

        {type === 'video' && (
          <Video {...this.props}>
            { children && children}
          </Video>
        )}
      </div>
    )
  }
}
