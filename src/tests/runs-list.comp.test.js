import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import runsFixture from './fixtures/fixture-runs-list'
import store from './../store/app-store'
import { mount } from 'enzyme'
import React from 'react'
import RunsList from './../components/runs-list'

configure({ adapter: new Adapter() })

describe('runs-list component tests', () => {
    
    it('runs filtering: positive', () => {
        store.runs.setList(runsFixture)
        const component = mount(
            <RunsList store={store} />
        )
        const filterInput = component.find('input')
        filterInput.simulate('focus')
        filterInput.simulate('change', {target: {value: 'new_value'}})
        filterInput.simulate('keyDown', { key: 'Enter' })
        //filterInput.simulate('keydown', { which: 't' })
        console.log('input = ' + filterInput.get(0).value)
        // expect(runTitleIsInEachItem).toBe(true)
    })

})
