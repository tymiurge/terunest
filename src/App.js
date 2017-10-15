import React, { Component } from 'react'
import { Container, Menu, Icon, Segment, Table, Input, Dropdown, Portal, Button, Header } from 'semantic-ui-react'
import RunsList from './components/runs-list'
import RunsHistory from './components/runs-history'

class App extends Component {
  state = { activeItem: 'runs history' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    
    return (
      <Container fluid={true}>
        <Menu pointing secondary>
          <Menu.Item name='runs history' active={activeItem === 'runs history'} onClick={this.handleItemClick} />
          <Menu.Item name='runs list' active={activeItem === 'runs list'} onClick={this.handleItemClick} />
        </Menu>
        {
          activeItem === 'runs history' &&
          <RunsHistory />
        }
        {
          activeItem === 'runs list' &&
          <RunsList />
        }
      </Container>
    );
  }
}

export default App;
