import runsFixture from './fixtures/fixture-runs-list'
import store from './../store/app-store'

describe('runs store tests', () => {

    beforeEach(() => {
        store.runs.setList(runsFixture)
    })

    it('filtering store with a single strict match in runTitle', () => {
        const {runs} = store
        runs.filter = 'build 0001'        
        const filteredList = store.runs.displayed
        expect(filteredList.length).toBe(1)
    })

    it('filtering store with a single strict match in initiator', () => {
        const {runs} = store
        runs.filter = 'fiona'        
        const filteredList = store.runs.displayed
        expect(filteredList.length).toBe(1)
    })

    it('filtering store with a single strict match in stageName', () => {
        const {runs} = store
        runs.filter = 'stage-00'        
        const filteredList = store.runs.displayed
        expect(filteredList.length).toBe(1)
    })

    it('filtering store with a no match', () => {
        const {runs} = store
        runs.filter = 'Thre is no such string in runs'        
        const filteredList = store.runs.displayed
        expect(filteredList.length).toBe(0)
    })
})