import * as React from 'react'
import { Transition } from 'react-spring/renderprops.cjs'
import { Props } from './index'

interface VideoProps extends Props {}

interface VideoState {
  loaded: boolean
}

export default class Video extends React.PureComponent<VideoProps, VideoState> {
  private container: React.RefObject<HTMLDivElement>
  private observer: IntersectionObserver | null

  public readonly state: Readonly<VideoState> = {
    loaded: false
  }

  constructor (props: VideoProps) {
    super(props)
    this.container = React.createRef()
    this.observer = null
  }

  handleCanPlay () {
    return new Promise((resolve) => {
      const { src } = this.props
      const video = document.createElement('video')

      video.src = src

      if (video && video.readyState >= 4) {
        return this.setState({
          loaded: true
        }, () => resolve())
      } else if (video) {
        video.addEventListener('canplaythrough', () => {
          this.setState({
            loaded: true
          }, () => resolve())
        })
      }
    })
  }

  handleDelayedPlay () {
    const { current: container } = this.container
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const { loaded } = this.state

          if (!loaded) {
            this.handleCanPlay().then(() => {
              return this.observer && container && this.observer.unobserve(container)
            }).catch(() => {
              console.error(
                ` Promise was rejected.
                  Intersection observer was not destroyed.
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

  async componentDidMount () {
    const { immediate } = this.props

    if (immediate) {
      await this.handleCanPlay()
    } else {
      this.handleDelayedPlay()
    }
  }

  render () {
    const {
      autoPlay,
      background,
      children,
      controls,
      loop,
      muted,
      playsInline,
      poster,
      src
    } = this.props

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
          leave={{ opacity: 0 }}
        >
          {loaded => loaded && (props => (
            <video
                {...(autoPlay ? { autoPlay } : {})}
                {...(controls ? { controls } : {})}
                loop={loop}
                muted={muted}
                playsInline={playsInline}
                {...(poster ? { poster } : {})}
                style={{
                  width: '100%',
                  height: '100%',
                  zIndex: 8,
                  position: 'relative',
                  objectFit: background,
                  ...props
                }}
                src={src}
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
