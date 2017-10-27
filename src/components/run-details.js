import React, { Component } from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react'
import { v4 } from 'js-uuid'
import TreeGrid from './tree-grid'

const treeField = {
    title: 'Run Title', field: 'title'
}

const statuses = [
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

    constructor (props) {
        super(props)
        this.allRows = this.fieldsMapper(items, statuses.map(field => field.field))
        this.state = {
            selectedRow: null,
            rows: this.allRows,
            currentFilter: 'all'
        }
    }

    nodeSummarizer = (nodes, statuses) => {
        const summary = nodes.reduce(
            (accumulator, node) => {
                statuses.forEach(field => {
                    accumulator[field] = (accumulator[field] || 0) + node[field]
                })
                return accumulator
            },
            {}
        )
        return summary
    }

    nodesAssigner = (tree, statuses) => tree.map(node => {
        if (!node.children) {
            return node
        }
        const children = this.nodesAssigner(node.children, statuses)
        const nodeSummary = this.nodeSummarizer(children, statuses)
        return Object.assign({}, node, {children}, nodeSummary)
    })
    
    leafConvertor = (leaf, statuses) => statuses.reduce(
        (accumulator, current) => {
            accumulator[current] = leaf.status === current ? 1 : 0
            return accumulator
        },
        {}
    )

    leafsAssigner = (tree, statuses) => tree.map(node => {
        if (!node.children) {
            let clone = Object.assign({}, node, this.leafConvertor(node, statuses))
            delete clone.status
            return clone
        }
        const children = this.leafsAssigner(node.children, statuses)
        return Object.assign({}, node, {children})
    })

    leafTotalSummurizer = (node, statuses) => statuses.reduce((accumulator, status) => accumulator + node[status], 0)

    totalSummurizer = (tree, statuses) => tree.map(node => {
        let changes = { total: this.leafTotalSummurizer(node, statuses)}
        if (node.children) changes['children'] = this.totalSummurizer(node.children, statuses)
        return Object.assign({}, node, changes)
    })

    fieldsMapper = (tree, statuses) => {
        const leafsNormTree = this.leafsAssigner(tree, statuses)
        const nodesNormTree = this.nodesAssigner(leafsNormTree, statuses)
        const nodesWithTotal = this.totalSummurizer(nodesNormTree, statuses)
        return nodesWithTotal
    }

    handleRowSelect = rowData => {
        this.setState(Object.assign({}, this.state, {selectedRow: rowData}))
    }

    filterTree = (tree, status) => {
        const treeWithNulls = tree.map(node => {
            if (!node.children && node[status] > 0) return node
            if (!node.children && node[status] === 0) return null
            if (node[status] === 0) return null
            const filteredChildren = this.filterTree(node.children, status)
            return Object.assign({}, node, {children: filteredChildren})
        })
        const filteredTree = treeWithNulls.filter(node => node !== null)
        return filteredTree
    }

    filterItems = (e, { name }) => {
        let stateCnages = {currentFilter: name, rows: this.allRows}
        if (name !== 'all') stateCnages.rows = this.filterTree(this.allRows, name)
        this.setState(Object.assign({}, this.state, stateCnages))        
    }

    leafsNumber = tree => tree.reduce(
        (accumulator, node) => {
            if (!node.children) return accumulator + 1
            return accumulator + this.leafsNumber(node.children)
        },
        0
    )
    
    render () {
        const { currentFilter } = this.state
        return (
            <Container fluid>
                <Segment.Group horizontal>
                    <Segment style={{width: '50%'}}>
                        <Menu text attached='top'>
                            <Menu.Item header>
                                Show
                            </Menu.Item>
                            <Menu.Item name='all' onClick={this.filterItems} active={currentFilter === 'all'} />
                            <Menu.Item name='failed' onClick={this.filterItems} active={currentFilter === 'failed'} />
                            <Menu.Item name='passed' onClick={this.filterItems} active={currentFilter === 'passed'} />
                            <Menu.Item name='skipped' onClick={this.filterItems} active={currentFilter === 'skipped'} />
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    all: {this.leafsNumber(this.allRows)}
                                    {
                                        this.state.currentFilter !== 'all' &&
                                        (', ' + this.state.currentFilter + ': ' + this.leafsNumber(this.state.rows))
                                    }
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <TreeGrid
                            attached
                            selectable
                            onRowSelect={rowData => this.handleRowSelect(rowData)}
                            treeField={treeField}
                            fields={ [{field: 'total', title: 'Total'}, ...statuses] }
                            treeNodes={this.state.rows}
                            formatter={value => {
                                    return {backgroundColor: '', value}
                                } 
                            }
                            fieldsFormatter={row => {
                                if (row.children) return {toBeApplied: false}
                                const rowStatus = statuses.filter(status => row[status.field] === 1)
                                return {toBeApplied: true, backgroundColor: '', value: rowStatus[0].title}
                            }}
                        />
                    </Segment>
                    <Segment style={{width: '50%'}}>
                    {
                        this.state.selectedRow &&
                        this.state.selectedRow.details
                    }
                    </Segment>
                </Segment.Group>
            </Container>
        )
    }
}

export default RunDetails
