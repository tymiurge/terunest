import React, { Component } from 'react'
import { Table, Icon, Button, Popup, Input } from 'semantic-ui-react'
import TreeGridCell from './tree-grid-cell'


const treeFlatify = (tree, level) => tree.map(node => {
    const changes = {expanded: true, level}
    if (node.children) {
      changes['children'] = treeFlatify(node.children, level + 1)
    }
    return Object.assign({}, node, changes)
})



class TreeGrid extends Component {

    constructor (props) {
        super(props)
        const rows = treeFlatify(this.props.items, 1)
        this.state = {
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
                <Table.Cell>{row.run1}</Table.Cell>
                <Table.Cell>{row.run2}</Table.Cell>
                <Table.Cell>{row.run3}</Table.Cell>
                <Table.Cell>{row.run4}</Table.Cell>
                <Table.Cell>{row.run5}</Table.Cell>
            </Table.Row>
        )
        return children && row.expanded
            ? [domRow].concat(this.renderRows(children))
            : domRow
    })

    render () {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {
                            this.props.headers.map( (header, idx) => 
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

export default TreeGrid