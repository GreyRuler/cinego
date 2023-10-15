export default function roundDateToHour(unix, hours) {
    const date = new Date(unix)
    date.setMilliseconds(0)
    date.setSeconds(0)
    date.setMinutes(0)
    date.setHours(hours)
    return Date.parse(date.toString())
}
