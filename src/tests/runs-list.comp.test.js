import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import runsFixture from './fixtures/fixture-runs-list'
import store from './../store/app-store'
import { mount } from 'enzyme'
import React from 'react'
import RunsList from './../components/runs-list'

configure({ adapter: new Adapter() })

const po = {

    setFilterValue: (wrapper, value) => wrapper.find('input').first().simulate('change', {target: {value}}),

    getDisplayedRunsCount: wrapper => wrapper.find('table tbody TableRow').length
}

describe('runs-list component tests', () => {
    
    it('runs filtering: text in filter is not encounter in table', () => {
        store.runs.setList(runsFixture)
        const component = mount( <RunsList store={store} /> )
        po.setFilterValue(component, 'build 00013')
        expect(po.getDisplayedRunsCount(component)).toEqual(0)
    })

    it('runs filtering: text in filter is encounter in table 1 time', () => {
        store.runs.setList(runsFixture)
        const component = mount( <RunsList store={store} /> )
        po.setFilterValue(component, 'build 0001')
        expect(po.getDisplayedRunsCount(component)).toEqual(1)
    })

    it('runs filtering: text in filter is encountered in all test runs', () => {
        store.runs.setList(runsFixture)
        const component = mount( <RunsList store={store} /> )
        po.setFilterValue(component, 'build 000')
        expect(po.getDisplayedRunsCount(component)).toEqual(2)
    })

})
