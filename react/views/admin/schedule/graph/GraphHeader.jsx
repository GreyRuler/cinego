import {useSelector} from "react-redux";

export function GraphHeader() {
    const {countHour, dateMin} = useSelector((state) => state.scheduleReducer.value)

    const dateNumberArray = Array.from({length: countHour}, (_, i) => {
        return new Date(dateMin + 60 * 60 * 1000 * i)
    }).reduce((carry, item) => {
        const formatTime = item.toDateString()
        if (carry[formatTime]) {
            carry[formatTime]++
        } else {
            carry[formatTime] = 1
        }
        return carry
    }, [])

    return (
        <thead>
        <tr>
            {Object.keys(dateNumberArray).map((time, i) => {
                const format = new Intl.DateTimeFormat('ru', {
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                })
                const countCol = dateNumberArray[time]
                return <th colSpan={countCol} key={i}>
                    <div className={'slug'} style={{width: `${70 * countCol}px`}}>{format.format(new Date(time))}</div>
                </th>
            })}
        </tr>
        <tr>
            {Array.from({length: countHour}, (_, i) => {
                const format = new Intl.DateTimeFormat('ru', {
                    hour: "numeric",
                    minute: "numeric",
                })
                const time = (new Date(dateMin + 60 * 60 * 1000 * i))
                return <th className='time' key={i}>
                    <div className={'slug'}>{format.format(time)}</div>
                </th>
            })}
        </tr>
        </thead>
    )
}
