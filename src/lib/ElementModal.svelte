<script>
    import {Modal, Table} from 'spaper'
    import {tableContext} from "../store/TableContext.ts";
    import PeriodicCell from "./PeriodicCell.svelte";

    const {modalShown, selectedElement: elem} = tableContext;

    $: props = [
        {label: 'Name', value: $elem.name},
        {label: 'Category', value: $elem.category},
        {label: 'Appearance', value: $elem.appearance},
        {label: 'Mass', value: $elem.atomic_mass},
        {label: 'Atomic radius', value: $elem.atomicRadius},
        {label: 'Van Der Waals radius', value: $elem.vanDerWaalsRadius},
        {label: 'Oxidation states', value: $elem.oxidationStates},
        {label: 'Bonding type', value: $elem.bondingType},

        {label: 'Melting point K', value: $elem.melt},
        {label: 'Boiling point K', value: $elem.boil},
        {label: 'Shells', value: $elem.shells.join(', ')},
        {label: 'Ionization energies', value: $elem.ionization_energies.join(', ')},
        {label: 'Molar heat', value: $elem.molar_heat},
        {label: 'Electron configuration', value: $elem.electron_configuration},
        {label: 'Electron affinity', value: $elem.electron_affinity},
        {label: 'Electronegativity by Pauling', value: $elem.electronegativity_pauling},
        {label: 'Discovered', value: $elem.yearDiscovered},
        {label: 'Discovered by', value: $elem.discovered_by},
        {label: 'Named by', value: $elem.named_by},

    ].map(it => it.value ? it : {});
</script>

<Modal bind:active={$modalShown} title="{$elem.name}">
    <div class="elem--content">
        <div class="elem--properties">
            <div class="elem--cell">
                <PeriodicCell nonTable={true} element={$elem}/>
            </div>
            <Table
                    data={props}
                    showHeader={false}/>
        </div>

        <section class="elem--description">
            <h5>Description</h5>
            {$elem.summary}
            <a href="https://wikipedia.org/wiki/{$elem.name}" rel="noreferrer noopener" target="_blank">More</a>
        </section>
    </div>
</Modal>

<style>
    .elem--content {
        max-height: 60vh;
        max-width: 80vw;
        overflow-y: scroll;
    }

    .elem--properties {
        display: flex;
        gap: 1rem;
    }

    .elem--cell {
        align-self: start;
    }
</style>
