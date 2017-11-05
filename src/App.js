import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import {MobxRouter} from 'mobx-router'
import MainMenu from './components/menu'

class App extends Component {
  state = { activeItem: 'runs list' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <Container fluid={true}>
        <MainMenu />
        <MobxRouter />
      </Container>
    );
  }
}

export default App;
