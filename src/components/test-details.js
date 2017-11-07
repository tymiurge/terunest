import React, { Component } from 'react'
import { Accordion, Icon, Label } from 'semantic-ui-react'
import TestSteps from './test-steps'
import ConsoleErrors from './console-errors'

class TestDetails extends Component {

    constructor (props) {
        super(props)
        this.state = {
            steps: true,
            consoleErrors: true
        }
    }

    toggle = panelName => {
        const changes = { [panelName]: !this.state[panelName] }
        this.setState(Object.assign({}, this.state, changes))
    }

    render () {
        return (
            <Accordion styled fluid>
                <Accordion.Title active={this.state.steps} onClick={() => this.toggle('steps')}>
                    <Icon name='dropdown' />
                    Steps
                    <Label color='blue' style={{marginLeft: '5px'}} horizontal>{this.props.steps.length}</Label>
                </Accordion.Title>
                <Accordion.Content active={this.state.steps}>
                    <TestSteps steps={this.props.steps} />
                </Accordion.Content>
                <Accordion.Title active={this.state.consoleErrors} onClick={() => this.toggle('consoleErrors')}>
                    <Icon name='dropdown' />
                    Console Errors
                    <Label color='red' style={{marginLeft: '5px'}} horizontal>{this.props.consoleErrors.length}</Label>
                </Accordion.Title>
                <Accordion.Content active={this.state.consoleErrors}>
                    <ConsoleErrors consoleErrors={this.props.consoleErrors} />
                </Accordion.Content>
            </Accordion>    
        )
    }
}

export default TestDetails