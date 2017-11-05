import React, { Component } from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react'
import TreeGrid from './tree-grid'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class RunDetails extends Component {

    constructor (props) {
        super(props)
        this.allRows = this.props.store.app.formattedRunDetails
        this.state = {
            selectedRow: null,
            rows: this.allRows,
            currentFilter: 'all'
        }
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
        const {app} = this.props.store
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
                                    all: {app.totalTestRuns}
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
                            treeField={app.testRunTreeField}
                            fields={ [{field: 'total', title: 'Total'}, ...app.statuses] }
                            treeNodes={this.state.rows}
                            formatter={value => {
                                    return {backgroundColor: '', value}
                                } 
                            }
                            fieldsFormatter={row => {
                                if (row.children) return {toBeApplied: false}
                                const rowStatus = app.statuses.filter(status => row[status.field] === 1)
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
