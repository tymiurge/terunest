const leafsNumber = tree => tree.reduce(
    (accumulator, node) => {
        if (!node.children) return accumulator + 1
        return accumulator + leafsNumber(node.children)
    },
    0
)

const filterTreeByStatus = (tree, status) => {
    const treeWithNulls = tree.map(node => {
        if (!node.children && node[status] > 0) return node
        if (!node.children && node[status] === 0) return null
        if (node[status] === 0) return null
        const filteredChildren = filterTreeByStatus(node.children, status)
        return Object.assign({}, node, {children: filteredChildren})
    })
    const filteredTree = treeWithNulls.filter(node => node !== null)
    return filteredTree
}

export { leafsNumber, filterTreeByStatus }