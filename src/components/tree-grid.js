import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import TreeGridCell from './tree-grid-cell'
import PropTypes from 'prop-types'

const propTypes = {
    treeField: PropTypes.shape({
        field: PropTypes.string,
        title: PropTypes.string
    }).isRequired,
    fields: PropTypes.array.isRequired,
    treeNodes: PropTypes.array.isRequired,
    /** 
     * @returns object of {backgroundColor: <value>, value: <value>}; is ignored if fieldsFormatter is defined and if 
     * fieldsFormatter returns {toBeApplied: true} 
     **/
    formatter: PropTypes.func.isRequired,
    /** 
     * if defined the all fields cells will be joint @returns object of 
     * {tobeApplied: bool, backgroundColor: <value>, value: <value>} 
     **/
    fieldsFormatter: PropTypes.func
}

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

    renderCells = row => {
        if (this.props.fieldsFormatter) {
            const format = this.props.fieldsFormatter(row)
            if (format.toBeApplied) {
                return ( 
                    <Table.Cell
                        style={{backgroundColor: format.backgroundColor}}
                        colSpan={this.props.fields.length}
                        key={row.id + format.value}
                        textAlign='center'
                        content={format.value}
                    />
                )
            }
        }
        return this.props.fields.map((field, fieldIdx) => {
            const format = this.props.formatter(row[field.field])
            return (
                <Table.Cell
                    style={{backgroundColor: format.backgroundColor}}
                    key={fieldIdx + row.id + format.value}
                    textAlign='center'
                    content={format.value}
                />
            )
        })
    }

    renderRows = rows => rows.map(row => {
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
                    /*this.props.fields.map((field, fieldIdx) => {
                        const format = this.props.formatter(row[field.field])
                        return (
                            <Table.Cell style={{backgroundColor: format.backgroundColor}} key={fieldIdx + row.id + format.value}>
                                { format.value }
                            </Table.Cell>
                        )
                    })*/
                    this.renderCells(row)
                    
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
