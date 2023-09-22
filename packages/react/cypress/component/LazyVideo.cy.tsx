import { useState } from 'react'
import { LazyVideo } from '../../src'

// Make an instance of LazyVideo that can be controlled
const Player = function({ autoplay }: any) {

  const [playing, setPlaying] = useState(autoplay)

  return (<>
    <LazyVideo
      src='https://placehold.co/300x200.mp4'
      alt=''
      playing={ playing }/>
    <div style={{ position: 'relative' }}>
      <button onClick={() => setPlaying(true)}>Play</button>
      <button onClick={() => setPlaying(false)}>Pause</button>
    </div>
  </>)
}


describe('playback', () => {

  it('can be paused and then restarted', () => {
    cy.mount(<Player autoplay={true} />)
    cy.get('video').isPlaying()
    cy.get('button').contains('Pause').click()
    cy.get('video').isPaused()
    cy.get('button').contains('Play').click()
    cy.get('video').isPlaying()
  })

  it('can be started and then paused', () => {
    cy.mount(<Player autoplay={false} />)
    cy.get('video').isPaused()
    cy.get('button').contains('Play').click()
    cy.get('video').isPlaying()
    cy.get('button').contains('Pause').click()
    cy.get('video').isPaused()
  })

})
