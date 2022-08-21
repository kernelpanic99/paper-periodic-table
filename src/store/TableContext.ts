import {derived, writable} from 'svelte/store'
import table from '../data/periodic-table.json'
import type {Element} from '../data/Element'
import {ColorUtils, palette} from "../util/ColorUtils";
import {env} from './environmentStore'

const {temperature} = env


export abstract class ColorMode {
    label: string

    abstract resolveColor(elem: Element, environment?: { temperature: number })

    static readonly CPK = 'cpk'
    static readonly GROUP = 'group'
    static readonly PHASE = 'phase'
    static readonly ELECTRONEG = 'electroneg'
}

export const colorModes: { [id: string]: ColorMode } = {
    [ColorMode.GROUP]: {
        label: 'Group',
        resolveColor(elem: Element) {
            return ColorUtils.getGroupColor(elem.group)
        }
    },
    [ColorMode.CPK]: {
        label: 'CPK',
        resolveColor(elem: Element) {
            return '#' + elem.cpk_hex || '#e5e9f0'
        }
    },
    [ColorMode.PHASE]: {
        label: 'Phase',
        resolveColor(elem: Element, environment?: { temperature: number }) {
            if (environment.temperature < elem.melt) {
                return ColorUtils.getPhaseColor('Solid')
            } else if (environment.temperature < elem.boil) {
                return ColorUtils.getPhaseColor('Liquid')
            } else {
                return ColorUtils.getPhaseColor('Gas')
            }
        }
    },
    [ColorMode.ELECTRONEG]: {
        label: 'Electronegativity',
        resolveColor(elem: Element, environment?: { temperature: number }) {
            const eneg = elem.electronegativity_pauling
            return ColorUtils.getElectronegColor(eneg)
        }
    },
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
