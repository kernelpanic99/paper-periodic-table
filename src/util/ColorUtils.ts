export interface RGBColor {
    r: number
    g: number
    b: number
}

type Color = RGBColor | string

const palette = {
    red: '#bf616a',
    pink: '#E5989F',
    orange: '#d08770',
    blue: '#5e81ac',
    lightBlue: '#81a1c1',
    yellow: '#ebcb8b',
    snowWhite: '#d8dee9',
    lightYellow: '#FFE9BC',
    violet: '#b48ead',
    green: '#a3be8c',
    lightGreen: '#CDE0BD'
}

export const groupPalette = {
    'noble gas': palette.blue,
    'metalloid': palette.yellow,
    'nonmetal': palette.green,
    'halogen': palette.lightBlue,
    'transition metal': palette.orange,
    'metal': palette.red,
    'post-transition metal': palette.snowWhite,
    'alkaline earth metal': palette.lightGreen,
    'alkali metal': palette.violet,
    'lanthanoid': palette.lightYellow,
    'actinoid': palette.pink,
}

export const phasePalette = {
    'Solid': '#d08770',
    'Gas': '#a3be8c',
    'Liquid': '#81a1c1'
}

export class ColorUtils {
    static getGroupColor(group) {
        return groupPalette[group] || palette.snowWhite
    }

    static getPhaseColor(phase){
        return phasePalette[phase] || palette.snowWhite
    }

    static hexToRgb(color: string | RGBColor): RGBColor | null {
        if (typeof color !== 'string') {
            return color
        }

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static brightness(color: Color) {
        if (!color) return 500;

        const rgb = this.hexToRgb(color)

        if (!rgb) return 500;

        return Math.round(((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000);
    }

    static contrast(bg: Color, fgDark: Color, fgLight: Color) {
        const br = this.brightness(bg)
        return br < 125 ? fgLight : fgDark
    }
}
