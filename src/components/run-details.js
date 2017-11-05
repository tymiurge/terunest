import React, { Component } from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react'
import TreeGrid from './tree-grid'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class RunDetails extends Component {

    constructor (props) {
        super(props)
        const items = this.props.store.app.loadedTestRun
        this.allRows = this.fieldsMapper(items, this.props.store.app.statuses.map(field => field.field))
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

    setFilter = name => {
        let stateChanges = {
            currentFilter: name,
            rows: name === 'all' ? this.allRows : this.filterTree(this.allRows, name)
        }
        const newState = Object.assign({}, this.state, stateChanges)
        this.setState(newState)
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
                            <Menu.Item name='all' onClick={(e, {name}) => this.setFilter(name)} active={currentFilter === 'all'} />
                            <Menu.Item name='failed' onClick={(e, {name}) => this.setFilter(name)} active={currentFilter === 'failed'} />
                            <Menu.Item name='passed' onClick={(e, {name}) => this.setFilter(name)} active={currentFilter === 'passed'} />
                            <Menu.Item name='skipped' onClick={(e, {name}) => this.setFilter(name)} active={currentFilter === 'skipped'} />
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
                            treeField={this.props.store.app.testRunTreeField}
                            fields={ [{field: 'total', title: 'Total'}, ...this.props.store.app.statuses] }
                            treeNodes={this.state.rows}
                            formatter={value => {
                                    return {backgroundColor: '', value}
                                } 
                            }
                            fieldsFormatter={row => {
                                if (row.children) return {toBeApplied: false}
                                const rowStatus = this.props.store.app.statuses.filter(status => row[status.field] === 1)
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
