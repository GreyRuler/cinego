export function Input({title, attrName, refInput, type = 'text', value=''}) {
	return (
		<label className="conf-step__label conf-step__label-fullsize">
			{title}
			<input className="conf-step__input" type={type} defaultValue={value}
				   name={attrName} required ref={refInput}/>
		</label>
	)
}
