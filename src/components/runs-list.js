import React, { Component } from 'react'
import { Container, Table, Input, Icon, Menu, Message } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import views from './../config/views'
import { tstampToShortStr, durationInMinutes } from './../utils'

@inject('store')
@observer
class RunsList extends Component {

    constructor (props) {
      super(props)
      this.state={
        helpDisplayed: false,
      }  
    }

    changeFilter = text => {
      this.props.store.runs.filter = text
    }

    resetFilter = () => {
      this.props.store.runs.filter = ''
    }

    toggleHelpVisibility = () => {
      const newState = Object.assign({}, this.state, {helpDisplayed: !this.state.helpDisplayed})
      this.setState(newState)
    }

    renderRows = rows => rows.map((row, idx) => {
      const {store} = this.props
      const {router: {goTo}} = store
      const {failed, error, passed, skipped} = row.runStatuses
      return (
        <Table.Row key={row.id} positive={row.failed === 0} negative={row.failed !== 0}>
          <Table.Cell collapsing>
            <Icon name='arrow circle right' link onClick={
              () => {
                  goTo(views.runDetails, {id: row.startAt}, store)
                }
              } />
          </Table.Cell>
          <Table.Cell>{row.brand + '-' + row.runType}</Table.Cell>
          <Table.Cell>{row.stageName}</Table.Cell>
          <Table.Cell>{row.initiator}</Table.Cell>
          <Table.Cell>{tstampToShortStr(row.startAt)}</Table.Cell>
          <Table.Cell>{durationInMinutes(row.duration)}</Table.Cell>
          <Table.Cell>{failed + error + passed + skipped}</Table.Cell>
          <Table.Cell>{failed}</Table.Cell>
          <Table.Cell>{error}</Table.Cell>
          <Table.Cell>{passed}</Table.Cell>
          <Table.Cell>{skipped}</Table.Cell>
        </Table.Row>
      )  
    })

    render() {
      const {runs} = this.props.store
      return (
        <Container>
          <Menu icon borderless fluid>
            <Menu.Item>
              <Input
                placeholder='...filter'
                transparent
                value={this.props.store.runs.filter}
                style={{width: '300px'}}
                onChange={e => this.changeFilter(e.target.value)}
              />
            </Menu.Item>
            <Menu.Menu position="right">
            <Menu.Item>
              total: {runs.list.length}
              {
                runs.filter !== '' &&
                ', filtered:' + runs.displayed.length
              }
            </Menu.Item>
              {
                runs.filter !== '' &&
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
                <Table.HeaderCell>Error</Table.HeaderCell>
                <Table.HeaderCell>Passed</Table.HeaderCell>
                <Table.HeaderCell>Skipped</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.renderRows(runs.displayed) }
            </Table.Body>
          </Table>
        </Container>
      )
  }
}

export default RunsList
