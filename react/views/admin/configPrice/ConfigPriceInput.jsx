import {Fragment, useEffect, useRef} from "react";
import classNames from "classnames";
import {setPrice} from "../../../reducers/admin/configPrice/slice.js";
import {useDispatch} from "react-redux";

export function ConfigPriceInput({price, seatName, type}) {
	const classNamesPrice = classNames({
		'conf-step__chair': true,
		'conf-step__chair_standard': type === 'standard',
		'conf-step__chair_vip': type === 'vip',
	})
	const dispatch = useDispatch()
	const refPrice = useRef(null)

	const onChange = () => {
		dispatch(setPrice({
			name: type,
			price: refPrice.current.value
		}))
	}

	useEffect(() => {
		refPrice.current.value = price
	}, [price])

	return (
		<Fragment>
			<div className="conf-step__legend">
				<label className="conf-step__label">Цена, рублей
					<input type="number" className='conf-step__input' placeholder="0" min={1}
						   ref={refPrice} onChange={onChange}/>
				</label> за <span className={classNamesPrice}></span> {seatName} кресла
			</div>
		</Fragment>
	)
}
