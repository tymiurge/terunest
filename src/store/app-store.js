import { observable } from 'mobx'
import { v4 } from 'js-uuid'

class AppStore {

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

    @observable testRuns = [
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
}

export default AppStore
