import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import TreeGridCell from './tree-grid-cell'
//import PropTypes from 'prop-types'
import {PropTypes} from 'mobx-react'

const propTypes = {
    treeField: PropTypes.objectOrObservableObject.isRequired,
    fields: PropTypes.arrayOrObservableArray.isRequired,
    treeNodes: PropTypes.arrayOrObservableArray.isRequired,
    /** 
     * @returns object of {backgroundColor: <value>, value: <value>}; is ignored if fieldsFormatter is defined and if 
     * fieldsFormatter returns {toBeApplied: true} 
     **/
    //formatter: PropTypes.func,
    /** 
     * if defined the all fields cells will be joint @returns object of 
     * {tobeApplied: bool, backgroundColor: <value>, value: <value>} 
     **/
    //fieldsFormatter: PropTypes.func,
    //selectable: PropTypes.bool,
    /** will be applied on row select only if selectable is defined in props */
    //onRowSelect: PropTypes.func,
    //attached: PropTypes.bool,
    //footer: PropTypes.bool
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

    componentWillReceiveProps (nextProps) {
        const newRows = treeFlatify(nextProps.treeNodes, 1)
        this.setState(Object.assign({}, this.state, {rows: newRows}))
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

    onRowClick = rowData => {
        this.props.onRowSelect && this.props.onRowSelect(rowData)
    }

    renderRows = rows => rows.map(row => {
        const { children, level } = row
        const intend = children ? (level - 1) * 1.43 : level * 1.43
        const domRow = (
            <Table.Row key={row.id + (row.children ? row.children.length : 0)} onClick={() => this.onRowClick(row)}>
                <TreeGridCell
                    intend={intend}
                    content={row.title}
                    isLeaf={!row.children}
                    isExpanded={row.expanded}
                    onExpand={() => this.toggleRowExpand(row.id)}
                />
                {
                    this.renderCells(row)
                }
            </Table.Row>
        )
        return children && row.expanded
            ? [domRow].concat(this.renderRows(children))
            : domRow
    })

    renderFooterCells = () => this.props.fields.map(gridFieldObj => {
        const footerFieldValue = this.props.treeNodes.reduce(
            (sum, current) => sum + current[gridFieldObj.field],
            0
        )
        return (
            <Table.HeaderCell
                textAlign='center'
                key={gridFieldObj.field + '_' + footerFieldValue}
            >
                {footerFieldValue}
            </Table.HeaderCell>
        )
    })

    render () {
        return (
            <Table celled compact selectable={this.props.selectable} attached={this.props.attached}>
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
                {
                this.props.footer &&
                <Table.Footer>
                    <Table.Row>
                    { [
                        <Table.HeaderCell>Summury</Table.HeaderCell>, 
                        ...this.renderFooterCells()
                    ] }
                    </Table.Row>
                </Table.Footer>
                }
            </Table>
        )
    }
}

TreeGrid.propTypes = propTypes

export default TreeGrid
