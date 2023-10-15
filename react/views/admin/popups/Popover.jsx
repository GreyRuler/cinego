import {useEffect, useRef} from "react";

export function Popover({title, children, target}) {
	const ref = useRef()

	useEffect(() => {
		ref.current.style.top = `${- (ref.current.offsetHeight + 4)}px`
		ref.current.style.left = `${target.offsetWidth / 2 - ref.current.offsetWidth / 2}px`
	}, [target])

	return (
		<div className="popover-custom" ref={ref}>
			<div className="popover-title" title={title}>{title}</div>
			<div className="popover-content">{children}</div>
		</div>
	)
}