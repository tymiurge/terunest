import React, { Component } from 'react'
import { Container, Table, Input, Icon, Menu, Message } from 'semantic-ui-react'
import { observer } from 'mobx-react'

@observer
class RunsList extends Component {

    constructor (props) {
      super(props)
      this.state={
        helpDisplayed: false,
        filterValue: '',
        items: this.props.appState.runs
      }  
    }

    resetFilter = () => {
      const newState = Object.assign({}, this.state, {filterValue: '', items: this.props.appState.runs})
      this.setState(newState)
    }

    toggleHelpVisibility = () => {
      const newState = Object.assign({}, this.state, {helpDisplayed: !this.state.helpDisplayed})
      this.setState(newState)
    }

    changeFilter = text => {
      const items = this.props.appState.runs.filter(item => {
        return item.runTitle.includes(text)
          || item.stageName.includes(text)
          || item.initiator.includes(text)
      })
      const newState = Object.assign({}, this.state, {filterValue: text, items})
      this.setState(newState)
    }

    renderRows = rows => rows.map((row, idx) => (
      <Table.Row key={row.id} positive={row.failed === 0} negative={row.failed !== 0}>
        <Table.Cell collapsing><Icon name='arrow circle right' link /></Table.Cell>
        <Table.Cell>{row.runTitle}</Table.Cell>
        <Table.Cell>{row.stageName}</Table.Cell>
        <Table.Cell>{row.initiator}</Table.Cell>
        <Table.Cell>{row.startAt}</Table.Cell>
        <Table.Cell>{row.duration}</Table.Cell>
        <Table.Cell>{row.total}</Table.Cell>
        <Table.Cell>{row.failed}</Table.Cell>
        <Table.Cell>{row.passed}</Table.Cell>
        <Table.Cell>{row.skipped}</Table.Cell>
      </Table.Row>
    ))

    render() {
      return (
        <Container>
          <Menu icon borderless fluid>
            
            <Menu.Item>
              <Input
                placeholder='...filter'
                transparent
                value={this.state.filterValue}
                style={{width: '300px'}}
                onChange={e => this.changeFilter(e.target.value)}
              />
            </Menu.Item>
            <Menu.Menu position="right">
            <Menu.Item>
              total: {this.props.appState.runs.length}
              {
                this.state.filterValue !== '' &&
                ', filtered:' + this.state.items.length
              }
            </Menu.Item>
              {
                this.state.filterValue !== '' &&
              <Menu.Item>
                <Icon name="remove" link onClick={this.resetFilter} />
              </Menu.Item>
              }
              <Menu.Item>
                <Icon name="question" link onClick={this.toggleHelpVisibility} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          {
            this.state.helpDisplayed &&
            <Message
            info
            onDismiss={this.toggleHelpVisibility}
            header='Filter rules'
            content={
              `
              There are two search modes: simple and complex. Simple is applied if the first sign in filter 
              is NOT =, otherwise complex search would be applied. 
              Simple search means the entered text would be tested against every text fields value of every entity in the grid. 
              Complex means entities.filter(entity => {return <the filter you entered after =>}) will be applied, so use valid js code for that. 
              The specified function body should return true or false. 
              `
            }
          />
          }

          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
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
              { this.renderRows(this.state.items) }
            </Table.Body>
          </Table>
        </Container>
    )
  }
}

export default RunsList;
