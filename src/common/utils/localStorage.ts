import { RootState } from 'store/store'

const KEY = 'state'

export function loadState() {
    try {
        const serializedState = localStorage.getItem(KEY)

        if (!serializedState) return undefined

        return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
}

export async function saveState(state: RootState) {
    let lsData = {...state}

    try {
        const serializedState = JSON.stringify(lsData)

        localStorage.setItem(KEY, serializedState)
    } catch (e) {
        // Ignore
    }
}