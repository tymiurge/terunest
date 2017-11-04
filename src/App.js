import React, { Component } from 'react'
import { Container, Menu } from 'semantic-ui-react'
import RunsList from './components/runs-list'
import RunDetails from './components/run-details'

class App extends Component {
  state = { activeItem: 'runs list' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const showRunDetails = true
    
    return (
      <Container fluid={true}>
        <Menu pointing secondary>
          <Menu.Item name='runs list' active={activeItem === 'runs list'} onClick={this.handleItemClick} />
          {
          showRunDetails &&
          <Menu.Item name='run details' active={activeItem === 'run details'} onClick={this.handleItemClick} />
          }
        </Menu>
        {
          activeItem === 'runs list' &&
          <RunsList {...this.props} />
        }
        {
          activeItem === 'run details' &&
          <RunDetails {...this.props} /> 
        }
      </Container>
    );
  }
}

export default App;
