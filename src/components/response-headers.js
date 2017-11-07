import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import Headers from './headers'

class ResponseHeaders extends Component {
    render () {
        return (
            <Table compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing>Code</Table.HeaderCell>
                        <Table.HeaderCell>Url</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.props.responses.reduce(
                            (arr, response) => {
                                arr = [...arr, {code: response.code, url: response.url}]
                                arr = [...arr, {headers: response.headers}]
                                return arr
                            }, 
                            []
                        ).map((item, idx) => {
                            if (item.code) {
                                return (
                                    <Table.Row key={idx + 'details'} warning>
                                        <Table.Cell collapsing>{item.code}</Table.Cell>
                                        <Table.Cell collapsing>{item.url}</Table.Cell>
                                    </Table.Row>
                                )
                            }
                            return (
                                <Table.Row key={idx + 'headers'}>
                                    <Table.Cell colSpan={2}><Headers headers={item}/></Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        )
    }
}

export default ResponseHeaders