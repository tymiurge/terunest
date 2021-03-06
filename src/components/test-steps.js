import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class TestSteps extends Component {
    renderRows = () => this.props.steps.map((step, idx) => {
        return (
            <Table.Row
                key={idx}
                negative={step.status === 'failed' || step.status === 'error'}
            >
                <Table.Cell>{step.text}</Table.Cell>
                <Table.Cell collapsing>{step.duration}</Table.Cell>
            </Table.Row>
        )
    }) 

    render () {
        return (
            <Table compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Step Description</Table.HeaderCell>
                        <Table.HeaderCell collapsing>Duration</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.renderRows()}
                </Table.Body>
            </Table>
        )
    }
}

export default TestSteps