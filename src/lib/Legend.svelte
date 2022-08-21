<script>
    export let paletteItems
</script>

<div class="legend">
    <ul class="legend--items">
        {#each Object.entries(paletteItems) as [key, color]}
            <li>
                <span class="legend--swatch" style="background-color:{color}"></span>
                <span class="legend--key">{key}</span>
            </li>
        {/each}
    </ul>
</div>

<style>
    .legend {
        background: transparent;
        padding: 0.5rem;
    }

    .legend--items {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .legend--swatch {
        display: inline-block;
        height: 0.7rem;
        width: 0.7rem;
        border-radius: 50%;
        border: 1px solid black;
    }
</style>
