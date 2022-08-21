import {derived, writable} from 'svelte/store'
import {TemperatureUtils, Unit} from "../util/Temperature";

export const env = new class {
    public temperature = writable(TemperatureUtils.ABS_ZERO + 25)
    public unit = writable(Unit.CELSIUS)

    public get displayTemp() {
        return derived(
            [this.temperature, this.unit],
            ([temp, unit]) => {
                return TemperatureUtils.convert(unit, temp)
            }
        )
    }
}
