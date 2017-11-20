import runsFixture from './fixtures/fixture-runs-list'
import store from './../store/app-store'

describe('runs store tests', () => {
    
    it('test whether setList adds runTitle to each of items', () => {
        store.runs.setList(runsFixture)
        const runTitleIsInEachItem = store.runs.list.reduce(
            (accumulator, current) => accumulator && current.hasOwnProperty('runTitle'),
            true
        )
        expect(runTitleIsInEachItem).toBe(true)
    })

})
