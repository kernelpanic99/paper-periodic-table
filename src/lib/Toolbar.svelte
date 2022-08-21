<script>
    import {Select, Slider} from 'spaper'
    import {tableContext} from '../store/TableContext.ts'
    import {env} from '../store/environmentStore.ts'
    import {ColorMode} from '../store/TableContext.ts'
    import {TemperatureUtils} from '../util/Temperature.ts'

    const {colorMode} = tableContext
    const {temperature, displayTemp, unit} = env

    const setTemp = value => () => {
        temperature.set(value)
    }
</script>

<ul class="toolbar shadow shadow-small">
    <li>
        <Select label="Color mode" bind:value={$colorMode}>
            <option value="Cpk">Cpk</option>
            <option value="Phase">Phase</option>
            <option value="Group">Group</option>
        </Select>
    </li>
    {#if $colorMode === ColorMode.PHASE}
        <li>
            <Slider
                    label="Temperature"
                    step="1"
                    min="{0}"
                    max={6500}
                    bind:value={$temperature}>

                <p slot="output" class="temp-label">
                    <span class="temp-label--temp">{$displayTemp.toFixed(0)}</span>
                    <Select bind:value={$unit} class="temp-label--unit">
                        <option value={0}>{'K'}</option>
                        <option value={1}>{'\u00b0C'}</option>
                        <option value={2}>{'\u00b0F'}</option>
                    </Select>
                    <button class="badge primary" on:click={setTemp(0)}>0 K</button>
                    <button class="badge secondary" on:click={setTemp(TemperatureUtils.ABS_ZERO + 25)}>
                        25&deg;C
                    </button>
                    <button class="badge success" on:click={setTemp(TemperatureUtils.ABS_ZERO + 100)}>
                        100&deg;C
                    </button>
                </p>
            </Slider>
        </li>
    {/if}

</ul>

<style>
    .toolbar {
        padding: 1rem;
        border: 2px solid #41403e;
        background: #fffcf7;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    ul, li {
        padding: 0;
        list-style: none;
        margin: 0;
    }

    li:before {
        content: '';
        margin: 0;
    }

    .temp-label {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
    }

    .temp-label--temp {
        display: block;
        width: 2rem;
    }

    .temp-label :global(.temp-label--unit) {
        max-height: 1.5rem;
        padding: 0.2rem;
    }
</style>
