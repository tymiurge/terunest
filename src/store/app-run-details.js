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
        /*
        const response =  [
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
        */
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
        //this.selected = entity.details ? entity : null
        this.selected = {
            "steps": [
                {
                    "text": "I open URL: http://stavka-stage-00.ginsp.net/?ref=qa_03_11", 
                    "duration": "2.21", 
                    "status": "passed"
                },
                {
                    "text": "I open URL: http://stavka-stage-00.ginsp.net/?ref=qa_03_11", 
                    "duration": "2.21", 
                    "status": "failed"
                },
                {
                    "text": "I open URL: http://stavka-stage-00.ginsp.net/?ref=qa_03_11", 
                    "duration": "2.21", 
                    "status": "error"
                }
            ], 
            "responseHeaders": [
                {
                    "code": "400", 
                    "headers": {
                        " 'Server'": " 'nginx'", 
                        " 'Error'": " 'data.hasOwnProperty is not a function'", 
                        " 'Connection'": " 'keep-alive'", 
                        " 'Cache-Control'": " 'no-cache'", 
                        " 'Date'": " 'Fri", " 19 Jan 2038 03": "14", 
                        "'Content-Type'": " 'text/javascript'", 
                        " 'Set-Cookie'": " 'uid=a18b9376-8ca2-4879-be00-369dc0c12f96; path=/; expires=Tue", 
                        " 'Transfer-Encoding'": " 'chunked'", 
                        " 03 Nov 2017 14": "41"
                    }, 
                    "url": "http://reportservice.stage-00.ginsp.net/track.js?brandId=2&ref=qa_03_11"
                }, 
                {
                    "code": "400", 
                    "headers": {
                        " 'Server'": " 'nginx'", 
                        " 'Connection'": " 'keep-alive'", 
                        " 'Error'": " 'data.hasOwnProperty is not a function'", 
                        " 'Date'": " 'Fri", 
                        " 'Cache-Control'": " 'no-cache'", 
                        "'Content-Type'": " 'text/javascript'", 
                        " 03 Nov 2017 14": "41", 
                        " 'Transfer-Encoding'": " 'chunked'"
                    }, 
                    "url": "http://reportservice.stage-00.ginsp.net/track.js?brandId=2&ref=qa_03_11"
                }
            ], 
            "consoleErrors": [
                {
                    "text": "http://reportservice.stage-00.ginsp.net/track.js?brandId=2&ref=qa_03_11 - Failed to load resource: the server responded with a status of 400 (Bad Request)"
                }, 
                {
                    "text": "http://reportservice.stage-00.ginsp.net/track.js?brandId=2&ref=qa_03_11 - Failed to load resource: the server responded with a status of 400 (Bad Request)"
                }
            ], 
            "duration": 2.2572367191314697, 
            "title": "test02_open_project_url", 
            "status": "passed"
        }
    }
}

export default RunDetailsStore
