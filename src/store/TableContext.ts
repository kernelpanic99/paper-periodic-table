import {derived, writable} from 'svelte/store'
import table from '../data/periodic-table.json'
import type {Element} from '../data/Element'

export enum ColorMode {
    CPK = 'Cpk',
    PHASE = 'Phase',
    GROUP = 'Group'
}

export const tableContext = new class {
    selectedElementId = writable(1)
    modalShown = writable(false)
    colorMode = writable(ColorMode.GROUP)

    get selectedElement() {
        return derived([this.selectedElementId], ([id]): Element => {
            // @ts-ignore
            return table.find(el => el.number === id) || table[0]
        })
    }
}
