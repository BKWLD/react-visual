import React from 'react'

export function NextVisual({ image }: {
	image: string
}): React.ReactElement {
	return (
		<h1>Hey { image }</h1>
	)
}
