import { observable, computed } from 'mobx'
import { v4 } from 'js-uuid'
import {RouterStore} from 'mobx-router'
import fieldsMapper from './details-tree-formatter'
import { leafsNumber } from './tree-utils'

class AppStore {
    @observable
    activeView = 'runsList'
    setActiveView = (viewName) => {this.activeView = viewName}

    runId = ''
    setRunId = id => {this.runId = id}

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
    
    /** loaded test run as a tree */
    @observable loadedTestRun = [
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

    @computed get formattedRunDetails() {
        return fieldsMapper(this.loadedTestRun, this.statuses.map(field => field.field))
    } 

    @computed get totalTestRuns() {
        return leafsNumber(this.formattedRunDetails)
    }

    @observable runs = [
        {
          id: v4(), runTitle: 'brand name 1 run', stageName: 'stage-00',
          initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
          total: 80, passed: 75, failed: 0, skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 2 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '65', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 3 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '65', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 4 run', stageName: 'stage-00',
          initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
          total: 80, passed: '63', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 5 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '73', failed: 0, skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 6 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '77', failed: 0, skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 7 run', stageName: 'stage-00',
          initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
          total: 80, passed: '63', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 8 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '65', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 9 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '65', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 10 run', stageName: 'stage-00',
          initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
          total: 80, passed: '63', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 11 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '65', failed: '12', skipped: 5
        },
        {
          id: v4(), runTitle: 'brand name 12 run', stageName: 'stage-00',
          initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
          total: 78, passed: '77', failed: 0, skipped: 5
        }
      ]
}
const store = {
    app: new AppStore(),
    router: new RouterStore()
}
export default store
