<script lang="ts">
    import 'papercss/dist/paper.min.css'
    import PeriodicTable from './lib/PeriodicTable.svelte'
    import './app.css'
    import {Tab, Tabs} from "spaper";
    import FormulaConstructor from "./lib/FormulaConstructor.svelte";
</script>

<main>
    <Tabs placement="center">
        <Tab label="Periodic table">
            <PeriodicTable/>
        </Tab>
        <Tab label="Formula constructor">
            <FormulaConstructor/>
        </Tab>
    </Tabs>
</main>

<style>
</style>
