import runsFixture from './fixtures/runs-list'
import store from './../store/app-store'

describe('runs-list tests', () => {

    it('test runs list filter', () => {
        store.runs.list = runsFixture
        store.runs.filter = 'build 1345'        
        const filteredList = store.runs.displayed
        expect(filteredList.length).toBe(1)
    })
})