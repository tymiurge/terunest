import React, { Component } from 'react'
import { Container, Table, Icon, Button, Popup, Input } from 'semantic-ui-react'
import TreeGrid from './tree-grid'
import { v4 } from 'js-uuid'

const headers = [{
    title: 'Run Title', field: 'title'
}, {
    title: '1', field: 'run1' 
}, , {
    title: '2', field: 'run2' 
}, {
    title: '3', field: 'run3' 
}, {
    title: '4', field: 'run4' 
}, , {
    title: '5', field: 'run5' 
}]
    

class RunsHistory extends Component {
    render() {
        
        const items = [
            {
            id: v4(),
            title: 'Vulkan Stavka',
            children: [{
                id: v4(),
                title: 'web',
                children: [
                    {
                        id: v4(),
                        title: 'Registration',
                        children: [{
                            id: v4(),title: 'test 1', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 2', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 3', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 4', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 5', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 6', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }]
                    }, {
                        id: v4(),
                        title: 'Login',
                        children: [{
                            id: v4(),title: 'test 1', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 2', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 3', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 4', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 5', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 6', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }]
                    }
                ]
            }, {
                id: v4(),
                title: 'mobile',
                children: [{
                    id: v4(),
                    title: 'Registration',
                    children: [
                        {
                            id: v4(),title: 'test 1', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 2', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 3', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 4', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 5', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 6', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }    
                    ]
                }]
            }]
        }, {
            id: v4(),
            title: 'Vulkan Bet',
            children: [{
                id: v4(),
                title: 'web',
                children: [
                    {
                        id: v4(),
                        title: 'Registration',
                        children: [{
                            id: v4(),
                            title: 'test 1', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 2', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 3', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 4', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 5', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 6', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }]
                    }, {
                        id: v4(),
                        title: 'Login',
                        children: [{
                            id: v4(),title: 'test 1', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 2', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 3', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 4', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 5', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 6', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }]
                    }
                ]
            }, {
                id: v4(),
                title: 'mobile',
                children: [{
                    id: v4(),
                    title: 'Registration',
                    children: [
                        {
                            id: v4(),title: 'test 1', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 2', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 3', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 4', run1: 'failed', run2: 'passed', run3: 'skipped', run4: 'failed', run5: 'failed'
                        }, {
                            id: v4(),title: 'test 5', run1: 'passed', run2: 'passed', run3: 'passed', run4: 'passed', run5: 'passed'
                        }, {
                            id: v4(),title: 'test 6', run1: 'passed', run2: 'failed', run3: 'passed', run4: 'skipped', run5: 'passed'
                        }    
                    ]
                }]
            }]
        }
        ]
        return (
            <Container>
                <TreeGrid headers={headers} items={items} />
            </Container>
        )
    }
}

export default RunsHistory
