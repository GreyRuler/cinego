import classNames from "classnames";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";

export default function SchemeCell({item}) {
    const takenPlaces = useSelector((state) => state.takenPlacesReducer.value)
    const [searchParams, setSearchParams] = useSearchParams()
    const places = searchParams.getAll('places[]').map((cellId) => Number.parseInt(cellId))
    const [cell, setCell] = useState({
        ...item,
        selected: places.includes(item.number),
        type_place: takenPlaces.includes(item.number) ? 'taken' : item.type_place
    })
    const classNameCell = classNames({
        'buying-scheme__chair': true,
        'buying-scheme__chair_disabled': cell.type_place === 'disabled',
        'buying-scheme__chair_standard': cell.type_place === 'standard',
        'buying-scheme__chair_taken': cell.type_place === 'taken',
        'buying-scheme__chair_vip': cell.type_place === 'vip',
        'buying-scheme__chair_selected': cell.selected,
    })

    const onSelectCell = () => {
        setCell({...cell, selected: !cell.selected})
        setSearchParams({
            'places[]': !cell.selected
                ? [...places, cell.number]
                : places.filter((cellId) => cellId !== cell.number)
        })
    }

    return (
        <span className={classNameCell} onClick={onSelectCell}></span>
    )
}
