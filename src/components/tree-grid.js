import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import TreeGridCell from './tree-grid-cell'
import PropTypes from 'prop-types'

const propTypes = {
    treeField: PropTypes.objectOf({
        field: PropTypes.string.isRequired,
        title: PropTypes.string
    }).isRequired,
    fields: PropTypes.array.isRequired,
    treeNodes: PropTypes.array.isRequired,
    formatter: PropTypes.func.isRequired 
}

const treeFlatify = (tree, level) => {
    const r = tree.map(node => {
        const changes = {expanded: true, level}
        if (node.children) {
        changes['children'] = treeFlatify(node.children, level + 1)
        }
        return Object.assign({}, node, changes)
    })
    return r
}
    



class TreeGrid extends Component {

    constructor (props) {
        super(props)
        const rows = treeFlatify(this.props.treeNodes, 1)
        this.state = {
            headers: [this.props.treeField, ...this.props.fields],
            rows
        }
    }

    toggleRowExpand = rowId => {
        const toggleExpandedProp = tree => tree.map(node => {
            const changes = {}
            if (node.id === rowId) { changes['expanded'] = !node.expanded }
            if (node.children) {changes['children'] = toggleExpandedProp(node.children) }
            return Object.assign({}, node, changes)
        })
        const newData = toggleExpandedProp(this.state.rows)
        this.setState({rows: newData})
    }

    renderRows = rows => rows.map((row, dix) => {
        const { children, level } = row
        const intend = children ? (level - 1) * 1.43 : level * 1.43
        const domRow = (
            <Table.Row key={row.id}>
                <TreeGridCell
                    intend={intend}
                    content={row.title}
                    isLeaf={!row.children}
                    isExpanded={row.expanded}
                    onExpand={() => this.toggleRowExpand(row.id)}
                />
                {
                    this.props.fields.map(field => {
                        const format = this.props.formatter(row[field.field])
                        return (<Table.Cell style={{backgroundColor: format.backgroundColor}}>
                            { format.value }
                        </Table.Cell>)
                    })
                    
                }
                
            </Table.Row>
        )
        return children && row.expanded
            ? [domRow].concat(this.renderRows(children))
            : domRow
    })

    render () {
        return (
            <Table celled compact>
                <Table.Header>
                    <Table.Row>
                        {
                            this.state.headers.map( (header, idx) => 
                                <Table.HeaderCell key={'header' + idx}>
                                    {header.title}
                                </Table.HeaderCell>)
                        }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.renderRows(this.state.rows)
                    }
                </Table.Body>
            </Table>
        )
    }
}

TreeGrid.propTypes = propTypes

export default TreeGrid
