<script>
    import table from '../data/periodic-table.json'
    import PeriodicCell from './PeriodicCell.svelte'
    import ElementModal from './ElementModal.svelte'
    import Toolbar from './Toolbar.svelte'
    import Legend from './Legend.svelte'

    import {groupPalette, phasePalette} from '../util/ColorUtils.ts'
    import {tableContext, ColorMode} from '../store/TableContext.ts'
    import {Checkbox} from "spaper";

    const numPeriods = 10
    const numGroups = 18
    let showHeaders = true
    const {colorMode} = tableContext

    function createAreas() {
        let areas = ""
        let start = showHeaders ? 0 : 1

        for (let period = start; period <= numPeriods; period++) {
            areas += "\""

            for (let group = start; group <= numGroups; group++) {
                areas += `x-${group}_y-${period}`

                if (group !== numGroups) {
                    areas += ' '
                }
            }

            areas += "\""
        }

        return areas
    }

    $:columns = `${showHeaders ? '1rem ' : ''}repeat(18 ,1fr)`
    $:style = `grid-template-areas: ${createAreas()};grid-template-columns:${columns}`
</script>

<div class="periodic-table">
    <aside class="sidebar">
        <Toolbar/>
    </aside>

    <div class="periodic-table--container">
        <ul class="periodic-table--options">
            <li>
                <Checkbox label="Show numbers" bind:checked={showHeaders}></Checkbox>
            </li>
        </ul>
        <div class="periodic-table--elements child-borders shadow shadow-small"
             style={style}>
            {#if showHeaders}
                {#each Array(numGroups) as _, g}
                    <h5 class="group-header" style="grid-area:{`x-${g + 1}_y-0`}">{g + 1}</h5>
                {/each}

                {#each Array(numPeriods) as _, p }
                    {#if p !== 7}
                        {#if p === 8}
                            <h5 class="period-header" style="grid-area:{`x-0_y-${p+1}`}">{6}</h5>
                        {:else if p === 9}
                            <h5 class="period-header" style="grid-area:{`x-0_y-${p+1}`}">{7}</h5>
                        {:else}
                            <h5 class="period-header" style="grid-area:{`x-0_y-${p+1}`}">{p + 1}</h5>
                        {/if}
                    {/if}

                {/each}
            {/if}

            {#if $colorMode === ColorMode.GROUP}
                <Legend paletteItems={groupPalette}/>
            {:else if $colorMode === ColorMode.PHASE}
                <Legend paletteItems={phasePalette}/>
            {/if}

            {#each table as elem}
                <PeriodicCell element={elem}/>
            {/each}
        </div>
    </div>
    <ElementModal/>
</div>

<style>
    .periodic-table {
        display: flex;
        margin: 2rem 1rem;
        gap: 1rem;
    }

    .periodic-table--container {
        width: 100%;
        border: 2px solid #41403e;
        background: #fffcf7;
    }

    .periodic-table--elements {
        display: grid;
        gap: .2rem;
        padding: 1rem;
    }

    .group-header, .period-header {
        border: none;
        text-align: center;
        margin: 0;
    }

    .period-header {
        max-width: 1rem;
    }

    .periodic-table :global(.legend) {
        grid-column-start: x-3_y-1;
        grid-column: span 10;
        grid-row: span 3;
    }

    .periodic-table--options :global(input) {
        display: inline-block;
    }
    .periodic-table--options :global(li:before) {
        content: '';
    }
</style>
