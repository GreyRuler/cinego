export default function loopState(state) {
    switch (state) {
        case 'disabled':
            return 'standard'
        case 'standard':
            return 'vip'
        case 'vip':
            return 'disabled'
    }
}
