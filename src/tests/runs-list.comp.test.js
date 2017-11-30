import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import runsFixture from './fixtures/fixture-runs-list'
import store from './../store/app-store'
import { mount } from 'enzyme'
import React from 'react'
import RunsList from './../components/runs-list'

configure({ adapter: new Adapter() })

const runsListPageObj = {

    setFilterValue: (wrapper, value) => {
        const filterInput = wrapper.find('input').first()
        filterInput.simulate('change', {target: {value: 'build 00013'}})
    },

    getDisplayedRunsCount: wrapper => wrapper.find('table tbody TableRow').length
}

describe('runs-list component tests', () => {
    
    it('runs filtering: text in filter is not encounter in table', () => {
        store.runs.setList(runsFixture)
        const component = mount( <RunsList store={store} /> )
        runsListPageObj.setFilterValue(component, 'build 00013')
        const remainingRuns = runsListPageObj.getDisplayedRunsCount(component)
        expect(remainingRuns).toEqual(0)
    })

    it('runs filtering: text in filter is encounter in table 1 time', () => {
        store.runs.setList(runsFixture)
        const component = mount(
            <RunsList store={store} />
        )
        const filterInput = component.find('input').first()
        filterInput.simulate('change', {target: {value: 'build 0001'}})
        const remainingRuns = component.find('table tbody TableRow').length
        expect(remainingRuns).toEqual(1)
    })

    it('runs filtering: text in filter is encountered in all test runs', () => {
        store.runs.setList(runsFixture)
        const component = mount(
            <RunsList store={store} />
        )
        const filterInput = component.find('input').first()
        filterInput.simulate('change', {target: {value: 'build 000'}})
        const remainingRuns = component.find('table tbody TableRow').length
        expect(remainingRuns).toEqual(2)
    })

})
