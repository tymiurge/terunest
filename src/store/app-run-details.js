import { observable, computed } from 'mobx'
import { v4 } from 'js-uuid'
import fieldsMapper from './details-tree-formatter'
import { leafsNumber, filterTreeByStatus } from './tree-utils'

class RunDetailsStore {
    @observable activeView = 'runsList'
    setActiveView = (viewName) => {this.activeView = viewName}

    /** list of possible test run statuses: now failed, passed, skipped, error */
    @observable statuses = [
        {
            title: 'Passed', field: 'passed' 
        }, 
        {
            title: 'Failed', field: 'failed' 
        }, 
        {
            title: 'Error', field: 'error' 
        }, 
        {
            title: 'Skipped', field: 'skipped' 
        }    
    ]
    
    /** tree field in the runs-list */
    @observable testRunTreeField = {
        title: 'Run Title', field: 'title'
    }

    fetchTestRun (id) {
        fetch('/runReport/' + id)
            .then(resp => resp.json())
            .then(data => {
                this.loadedTestRun = fieldsMapper(data, this.statuses.map(field => field.field))
            })
    }

    /** loaded test run as a tree */
    @observable loadedTestRun = []

    @computed get displayedTests() {
        const tests = this.currentFilter === 'all'
            ? this.loadedTestRun
            : filterTreeByStatus(this.loadedTestRun, this.currentFilter)
        return tests
    }


    @computed get totalTestRuns() {
        return leafsNumber(this.loadedTestRun)
    }

    @computed get displayedTestsNumber() {
        return leafsNumber(this.displayedTests)
    }

    @observable currentFilter = 'all'

    setCurrentFilter (filterName) {
        this.currentFilter = filterName
    }

    @observable selected = null

    setSelected(entity) {
        this.selected = entity.children ? null : entity
    }
}

export default RunDetailsStore
