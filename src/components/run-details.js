import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { v4 } from 'js-uuid'
import TreeGrid from './tree-grid'
import deepAssign from 'deep-assign'

const treeField = {
    title: 'Run Title', field: 'title'
}

const fields = [
    {
        title: 'Passed', field: 'passed' 
    }, {
        title: 'Failed', field: 'failed' 
    }, {
        title: 'Error', field: 'error' 
    }, {
        title: 'Skipped', field: 'skipped' 
    }    
]

const items = [
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

class RunDetails extends Component {

    nodeSummarizer = (nodes, fields) => {
        const summary = nodes.reduce(
            (accumulator, node) => {
                fields.forEach(field => {
                    accumulator[field] = (accumulator[field] || 0) + node[field]
                })
                return accumulator
            },
            {}
        )
        return summary
    }

    nodesAssigner = (tree, fields) => tree.map(node => {
        if (!node.children) {
            return node
        }
        const children = this.nodesAssigner(node.children, fields)
        const nodeSummary = this.nodeSummarizer(children, fields)
        return Object.assign({}, node, {children}, nodeSummary)
    })
    
    leafConvertor = (leaf, fields) => fields.reduce(
        (accumulator, current) => {
            accumulator[current] = leaf.status === current ? 1 : 0
            return accumulator
        },
        {}
    )

    leafsAssigner = (tree, fields) => tree.map(node => {
        if (!node.children) {
            let clone = Object.assign({}, node, this.leafConvertor(node, fields))
            delete clone.status
            return clone
        }
        const children = this.leafsAssigner(node.children, fields)
        return Object.assign({}, node, {children})
    })

    leafTotalSummurizer = (node, statuses) => {
        const total = statuses.reduce(
            (accumulator, status) => {
                return accumulator + node[status]
            }, 
            0
        )
        return total
    }

    totalSummurizer = (tree, statuses) => tree.map(node => {
        let changes = { total: this.leafTotalSummurizer(node, statuses)}
        if (node.children) changes = Object.assign(changes, {children: this.totalSummurizer(node.children, statuses)})
        return Object.assign({}, node, changes)
    })

    fieldsMapper = (tree, fields) => {
        const leafsNormTree = this.leafsAssigner(tree, fields)
        const nodesNormTree = this.nodesAssigner(leafsNormTree, fields)
        const nodesWithTotal = this.totalSummurizer(nodesNormTree, fields)
        return nodesWithTotal
    }
    
    render () {
        let summarizedTree = this.fieldsMapper(items, fields.map(field => field.field))
        return (
            <Container>
                <TreeGrid
                    treeField={treeField}
                    fields={fields}
                    treeNodes={items}
                    formatter={value => {
                            return {backgroundColor: '', value: 'vivat!'}
                        } 
                    }
                />
            </Container>
        )
    }
}

export default RunDetails
