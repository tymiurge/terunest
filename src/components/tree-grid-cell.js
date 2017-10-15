import React, {Component} from 'react'
import { Table, Icon, Button, Popup, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
    intend: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    isLeaf: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool,
    onExpand: PropTypes.func.isRequired
}

class TreeGridCell extends Component {

    render () {
        return (
            <Table.Cell>
                <div style={{marginLeft: this.props.intend + 'em'}}>
                    {
                        !this.props.isLeaf &&
                        <Icon
                            link
                            name={this.props.isExpanded ? 'caret down' : 'caret right'}
                            onClick={this.props.onExpand}
                        />
                    }
                    {this.props.content}
                </div>
            </Table.Cell>
        )
    }
}

TreeGridCell.propTypes = propTypes

export default TreeGridCell