import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class ConsoleErrors extends Component {
    render () {
        return (
            <Table compact>
                <Table.Body>
                    {
                        this.props.consoleErrors.map((err, idx) => {
                            return (
                                <Table.Row key={idx}>
                                    <Table.Cell>{err.text}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        )
    }
}

export default ConsoleErrors
