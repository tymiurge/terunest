import React, { Component } from 'react'
import { Container, Menu, Table, Input, Dropdown } from 'semantic-ui-react'

class App extends Component {
  state = { activeItem: 'runs list' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const stageOptions = [
      { key: 'English', text: 'English', value: 'English' },
      { key: 'French', text: 'French', value: 'French' },
      { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
      { key: 'German', text: 'German', value: 'German' },
      { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
    ]
    return (
      <Container fluid={true}>
        <Menu pointing secondary>
          <Menu.Item name='runs history' active={activeItem === 'runs history'} onClick={this.handleItemClick} />
          <Menu.Item name='runs list' active={activeItem === 'runs list'} onClick={this.handleItemClick} />
        </Menu>
        <Container>
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
              <Table.Row>
                <Table.HeaderCell style={{padding: '2px 3px 2px 3px'}}>
                  <Input placeholder='...' style={{width: '100%'}}/>
                </Table.HeaderCell>
                <Table.HeaderCell style={{padding: '2px 3px 2px 3px'}}>
                  <Dropdown style={{width: '100%'}}
                    compact
                    options={stageOptions}
                    placeholder='...'
                    search
                    selection
                  />
                </Table.HeaderCell>
                <Table.HeaderCell style={{padding: '2px 3px 2px 3px'}}>
                  <Dropdown style={{width: '100%'}}
                    compact
                    options={stageOptions}
                    placeholder='...'
                    search
                    selection
                  />
                </Table.HeaderCell>
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
      </Container>
    );
  }
}

export default App;
