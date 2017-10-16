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
    

class RunsHistory extends Component {

    
    objectKeysSum = arr => arr.reduce((accumulator, current) => 
        {
            for (let key in current) {
                if (current.hasOwnProperty(key))
                    accumulator[key] = (accumulator[key] || 0) + current[key]
            }
            return accumulator 
        }, 
        {}
    );
      

    nodeSummurizer = (node, field) => {
        if (!node.children) return {[node[field]] : 1}
        return node.children.reduce(
            (total, current) => {
                if (!current.children) {
                    total[current[field]] = (total[current[field]] || 0) + 1
                    return total
                }
                return this.objectKeysSum([
                    ...current.children.map(item => this.nodeSummurizer(item, field)), 
                    total
                ])
            },
            {}
        )
    }

    render() {
        //const normilizedItems = this.normilize(items, ['run1', 'run2', 'run3', 'run4', 'run5'])
        const firstSummary = this.nodeSummurizer(items[0], 'run4')
        console.log('firstSummary = ' + firstSummary)
        console.log('finished')
        return (
            <Container>
                <TreeGrid headers={headers} items={items} />
            </Container>
        )
    }
}

export default RunsHistory
