export function Select({title, attrName, list, refSelect}) {
	return (
		<label className="conf-step__label conf-step__label-fullsize">
			{title}
			<select className="conf-step__input" name={attrName} ref={refSelect} required>
				{list.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
			</select>
		</label>
	)
}
