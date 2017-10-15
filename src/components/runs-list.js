import React, { Component } from 'react'
import { Container, Menu, Icon, Segment, Table, Input, Dropdown, Portal, Button, Header } from 'semantic-ui-react'

class RunsList extends Component {

    render() {
    return (
        <Container>
          <Input fluid icon='filter' placeholder='Filter...' />

          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Run Title</Table.HeaderCell>
                <Table.HeaderCell>Stage Name</Table.HeaderCell>
                <Table.HeaderCell>Initializer</Table.HeaderCell>
                <Table.HeaderCell>Start time</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Failed</Table.HeaderCell>
                <Table.HeaderCell>Passed</Table.HeaderCell>
                <Table.HeaderCell>Skipped</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row positive>
                <Table.Cell>vulkan stavka web check</Table.Cell>
                <Table.Cell>stage-00</Table.Cell>
                <Table.Cell>paulwalker</Table.Cell>
                <Table.Cell>10/10/17, 21:45</Table.Cell>
                <Table.Cell>26m, 45s</Table.Cell>
                <Table.Cell>52</Table.Cell>
                <Table.Cell>12</Table.Cell>
                <Table.Cell>38</Table.Cell>
                <Table.Cell>2</Table.Cell>
              </Table.Row>
              <Table.Row negative>
                <Table.Cell>vulkan stavka web check</Table.Cell>
                <Table.Cell>production</Table.Cell>
                <Table.Cell>paulwalker</Table.Cell>
                <Table.Cell>10/10/17, 21:45</Table.Cell>
                <Table.Cell>26m, 45s</Table.Cell>
                <Table.Cell>52</Table.Cell>
                <Table.Cell>12</Table.Cell>
                <Table.Cell>38</Table.Cell>
                <Table.Cell>2</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    )
  }
}

export default RunsList;
