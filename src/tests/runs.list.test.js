import runsFixture from './fixtures/fixture-runs-list'
import store from './../store/app-store'

describe('runs-list tests', () => {

    it('test runs list filter', () => {
        const {runs} = store
        runs.setList(runsFixture)
        runs.filter = 'build 0001'        
        const filteredList = store.runs.displayed
        expect(filteredList.length).toBe(1)
    })
})