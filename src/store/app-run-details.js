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
        setTimeout(
            () => {
                const response = 
                [
                    {
                        id: v4(), title: 'Runs History',
                        children: [
                            {
                                id: v4(), title: 'Tree functionality', 
                                children: [
                                    {
                                        id: v4(), title: 'expand 1-st level parent',
                                        status: 'passed',
                                        details: 'details'
                                    },
                                    {
                                        id: v4(), title: 'expand 2-nd level parend',
                                        status: 'passed',
                                        details: 'some details here too'
                                    }
                                ]
                            }, 
                            {
                                id: v4(), title: 'Last level parent status',
                                children: [
                                    {
                                        id: v4(), title: 'Last level parent: all failed', status: 'failed',
                                        details: 'some details here too'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: all passed', status: 'passed',
                                        details: 'pass details'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: all skipped', status: 'skipped',
                                        details: 'skip details'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: all errors', status: 'error',
                                        details: 'error details'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: failed plus passed, skipped, error',
                                        status: 'failed',
                                        details: 'failed'
                                    },
                                    {
                                        id: v4(), title: 'leaf are passed, skipped and error', status: 'error',
                                        details: 'some details'
                                    }, 
                                    {
                                        id: v4(), title: 'leafs are skipped and error', status: 'skipped',
                                        details: 'some details'
                                    }, 
                                    {
                                        id: v4(), title: 'leafs are passed and error', status: 'skipped',
                                        details: 'some details'
                                    }, 
                                    {
                                        id: v4(), title: 'leafs are passed and skipped', status: 'skipped',
                                        details: 'some details'
                                    }
                                ]
                            },
                            {
                                id: v4(), title: 'First level parent status',
                                children: [
                                    {
                                        id: v4(), title: 'Last level parent: all failed', status: 'failed',
                                        details: 'some details here too'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: all passed', status: 'passed',
                                        details: 'pass details'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: all skipped', status: 'skipped',
                                        details: 'skip details'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: all errors', status: 'error',
                                        details: 'error details'
                                    }, 
                                    {
                                        id: v4(), title: 'Last level parent: failed plus passed, skipped, error',
                                        status: 'failed',
                                        details: 'failed'
                                    },
                                    {
                                        id: v4(), title: 'leaf are passed, skipped and error', status: 'error',
                                        details: 'some details'
                                    }, 
                                    {
                                        id: v4(), title: 'leafs are skipped and error', status: 'skipped',
                                        details: 'some details'
                                    }, 
                                    {
                                        id: v4(), title: 'leafs are passed and error', status: 'skipped',
                                        details: 'some details'
                                    }, 
                                    {
                                        id: v4(), title: 'leafs are passed and skipped', status: 'skipped',
                                        details: 'some details'
                                    }
                                ]
                            }
                        ]
                    }
                ]
                this.loadedTestRun = fieldsMapper(response, this.statuses.map(field => field.field))
            },
            50
        )
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
}

export default RunDetailsStore
