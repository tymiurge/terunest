import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'


class Headers extends Component {

    renderRows = () => {
        const {headers} = this.props.headers
        return Object.keys(headers).map(headerKey => (
            <Table.Row key={headerKey}>
                <Table.Cell>{headerKey}</Table.Cell>
                <Table.Cell>{headers[headerKey]}</Table.Cell>
            </Table.Row>
        ))
    }
    render () {
        return (
            <Table size='small'>
                <Table.Body>
                    {this.renderRows()}
                </Table.Body>
            </Table>
        )
    }
}

export default Headers