export enum Unit {
    KELVIN,
    CELSIUS,
    FAHRENHEIT
}

export class TemperatureUtils {
    static readonly ABS_ZERO = 273.15

    static convert(unit, temp) {
        switch (unit) {
            case Unit.CELSIUS:
                return temp - this.ABS_ZERO
            case Unit.FAHRENHEIT:
                return (temp - this.ABS_ZERO) * 1.8 + 32
            default:
                return temp
        }
    }
}
