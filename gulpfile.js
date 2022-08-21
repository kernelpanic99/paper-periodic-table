import githubTable from './raw-data/github-data.json' assert {type: 'json'}
import apiTable from './raw-data/api-data.json' assert {type: 'json'}
import axios from "axios";
import {writeFileSync} from 'fs'
import gulp from 'gulp'

const githubFile = './raw-data/github-data.json'
const apiFile = './raw-data/api-data.json'
const outFile = './src/data/periodic-table.json'

const unknownOr = (value, replacement) => replacement && (value === 'unknown') ? replacement : value

export function fetchChemApi() {
    return axios('https://periodic-table-elements-info.herokuapp.com/elements')
        .then((res) => {
            const str = JSON.stringify(res.data, null, 4)

            writeFileSync(apiFile, str)
        })
        .catch(console.error)
}

export function fetchFromGitHub() {
    return axios('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
        .then(res => {
            const str = JSON.stringify(res.data.elements, null, 4)

            writeFileSync(githubFile, str)
        })
        .catch(console.error)
}

export const updateData = gulp.series([fetchChemApi, fetchFromGitHub])

export function mergeData(cb) {
    const res = githubTable

    for (let i = 0; i < res.length; i++) {
        const elem = res[i];

        if (elem.number === 119) {
            res.splice(i, 1)
            continue
        }

        const apiElem = apiTable.find(el => el.atomicNumber === elem.number)
        elem.cpk_hex = elem['cpk-hex']
        elem['cpk-hex'] = undefined

        elem.melt = unknownOr(apiElem.meltingPoint, elem.melt)
        elem.boil = unknownOr(apiElem.boilingPoint, elem.boil)

        Object.assign(elem, {
            atomicRadius: apiElem.atomicRadius,
            ionRadius: apiElem.ionRadius,
            vanDerWaalsRadius: apiElem.vanDerWaalsRadius,
            oxidationStates: apiElem.oxidationStates,
            bondingType: apiElem.bondingType,
            group: apiElem.groupBlock,
            yearDiscovered: 1774,
            table_block: apiElem.block,
        })
    }

    const json = JSON.stringify(res, null, 4)
    writeFileSync(outFile, json)

    cb()
}
