<script>
    import {Button} from 'spaper'
    import {ColorMode, colorModes, tableContext} from '../store/TableContext.ts'
    import {ColorUtils} from '../util/ColorUtils.ts'
    import {env} from '../store/environmentStore'

    const {colorMode} = tableContext;
    const {temperature} = env;

    export let element
    export let nonTable = false

    function selectElement() {
        tableContext.modalShown.update(() => true)
        tableContext.selectedElementId.update(() => element.number)
    }

    let bgColor;

    $:if (!nonTable) {
        bgColor = colorModes[$colorMode].resolveColor(element, {temperature: $temperature})
    } else {
        bgColor = colorModes[ColorMode.CPK].resolveColor(element)
    }

    $:fgColor = ColorUtils.contrast(bgColor, '#2e3440', '#eceff4')
    $:style = `
        grid-area: x-${element.xpos}_y-${element.ypos};
        background:${bgColor};
        color:${fgColor};
    `
</script>

<Button
        on:click={selectElement}
        style={style}
        title="{element.name}">
    <span class="elem--number">{element.number}</span>
    <strong class="elem--symbol">{element.symbol}</strong>
    <span class="elem--mass">{element.atomic_mass.toFixed(2)}</span>
</Button>

<style>
    span, em {
        display: block;
    }

    .elem--number {
        font-size: 0.7em;
    }

    .elem--symbol {
        font-size: 0.9em;
    }

    .elem--mass {
        font-size: 0.6em;
    }

    .elem--name {
        font-size: .6rem;
    }
</style>
