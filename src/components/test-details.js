import React, { Component } from 'react'
import { Accordion, Icon, Label } from 'semantic-ui-react'
import TestSteps from './test-steps'
import ConsoleErrors from './console-errors'

class TestDetails extends Component {
    render () {
        return (
            <Accordion styled fluid>
                <Accordion.Title active={true} index={0}>
                    <Icon name='dropdown' />
                    Steps
                    <Label color='blue' style={{marginLeft: '5px'}}horizontal>{this.props.steps.length}</Label>
                </Accordion.Title>
                <Accordion.Content active={true}>
                    <TestSteps steps={this.props.steps} />
                </Accordion.Content>
                <Accordion.Title active={true} index={1}>
                    <Icon name='dropdown' />
                    Console Errors
                    <Label color='blue' style={{marginLeft: '5px'}}horizontal>{this.props.consoleErrors.length}</Label>
                </Accordion.Title>
                <Accordion.Content active={true}>
                    <ConsoleErrors consoleErrors={this.props.consoleErrors} />
                </Accordion.Content>
            </Accordion>    
        )
    }
}

export default TestDetails