import * as React from 'react'
import loadImage from 'image-promise'
import { Transition } from 'react-spring/renderprops.cjs'
import { Props } from './index'

interface ImageProps extends Props {}

interface ImageState {
  loaded: boolean
}

export default class Image extends React.PureComponent<ImageProps, ImageState> {
  private srcSet: string | undefined
  private container: React.RefObject<HTMLDivElement>
  private observer: IntersectionObserver | null

  public readonly state: Readonly<ImageState> = {
    loaded: false
  }

  constructor (props: ImageProps) {
    super(props)
    this.srcSet = props.srcSet && props.srcSet.toString()
    this.container = React.createRef()
    this.observer = null
  }

  handleLazyLoad () {
    const { current: container } = this.container
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const { loaded } = this.state
          const { src } = this.props

          if (src && !loaded) {
            loadImage(src).then(() => {
              this.setState({
                loaded: true
              }, () => this.observer && container && this.observer.unobserve(container))
            }).catch(() => {
              console.error(
                `Image: ${src} was not loaded!
                 Please check your src and try again.
                `)
            })
          }
        }
      },
      {
        root: null,
        rootMargin: `${this.props.rootMargin}`,
        threshold: 0.0
      }
    )

    if (container) {
      this.observer.observe(container)
    }
  }

  handleImmediateLoad () {
    const { src } = this.props

    if (src) {
      loadImage(src).then(() => {
        this.setState({ loaded: true })
      })
    }
  }

  componentDidMount () {
    const { immediate } = this.props

    if (immediate) {
      return this.handleImmediateLoad()
    }

    return this.handleLazyLoad()
  }

  componentWillUnmount () {
    const { current: container } = this.container

    if (container) {
      return this.observer && this.observer.unobserve(container)
    }
  }

  render () {
    const { background, children, poster, src } = this.props
    const { loaded } = this.state

    return (
      <div
        ref={this.container}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 10
        }}
      >
        { children && (
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            right: 0,
            zIndex: 9
          }}>{children}</div>
        )}
        <Transition
          items={loaded}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}>
          { loaded => loaded && (props => (
            <img
              style={{
                width: '100%',
                height: '100%',
                zIndex: 8,
                position: 'relative',
                objectFit: background,
                ...props
              }}
              src={src}
              {...(this.srcSet ? { srcSet: this.srcSet } : {})}
            />
          ))}
        </Transition>
        { poster && (
          <img
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: 7
            }}
            src={poster}
          />
        )}
      </div>
    )
  }
}
