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
            selectedRow: null
        }
    }

    handleRowSelect = rowData => {
        this.setState(Object.assign({}, this.state, {selectedRow: rowData}))
    }
    
    setFilter = name => {
        this.props.store.app.currentFilter = name
    }

    renderFilterItems = () => {
        const {app} = this.props.store
        const statuses = ['all', ...app.statuses.map(status => status.field)]
        return statuses.map(status =>
            <Menu.Item
                name={status}
                onClick={(e, {name}) => this.setFilter(name)}
                active={app.currentFilter === status}
                key={'filterMenuItem:' + status}
            />
        )
    }

    render () {
        const {app} = this.props.store
        return (
            <Container fluid>
                <Segment.Group horizontal>
                    <Segment style={{width: '50%'}}>
                        <Menu text attached='top'>
                            <Menu.Item header>
                                Show
                            </Menu.Item>
                            { this.renderFilterItems() }
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    all: {app.totalTestRuns}
                                    {
                                        app.currentFilter !== 'all' &&
                                        (', ' + app.currentFilter + ': ' + app.displayedTestsNumber)
                                    }
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <TreeGrid
                            attached={true}
                            selectable
                            onRowSelect={rowData => this.handleRowSelect(rowData)}
                            treeField={app.testRunTreeField}
                            fields={ [{field: 'total', title: 'Total'}, ...app.statuses] }
                            treeNodes={app.displayedTests}
                            formatter={
                                function(value) {return {backgroundColor: '', value}}
                                /*value => {
                                    return {backgroundColor: '', value}
                                } */
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
