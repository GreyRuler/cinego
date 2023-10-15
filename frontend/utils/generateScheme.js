export default function generateScheme(n, m) {
    const states = [
        'vip',
        'standard',
        'taken',
        'disabled',
    ]
    let numberPlace = 1
    return Array.from({length: n}, () => (
        Array.from({length: m}, () => {
            return {
                number: numberPlace++,
                state: states[Math.round(Math.random() * 3)]
            }
        })
    ))
}
