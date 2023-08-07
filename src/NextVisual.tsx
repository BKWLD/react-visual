import React from 'react'
import type { NextVisualProps } from '../types/nextVisualTypes'

export function NextVisual({ image }: NextVisualProps): React.ReactElement {
	return (
		<h1>Hey { image }</h1>
	)
}
