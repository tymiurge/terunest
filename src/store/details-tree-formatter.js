const fieldsMapper = (tree, statuses) => {
    const leafsNormTree = leafsAssigner(tree, statuses)
    const nodesNormTree = nodesAssigner(leafsNormTree, statuses)
    const nodesWithTotal = totalSummurizer(nodesNormTree, statuses)
    return nodesWithTotal
}

const leafsAssigner = (tree, statuses) => tree.map(node => {
    if (!node.children) {
        let clone = Object.assign({}, node, leafConvertor(node, statuses))
        delete clone.status
        return clone
    }
    const children = leafsAssigner(node.children, statuses)
    return Object.assign({}, node, {children})
})

const nodesAssigner = (tree, statuses) => tree.map(node => {
    if (!node.children) {
        return node
    }
    const children = nodesAssigner(node.children, statuses)
    const nodeSummary = nodeSummarizer(children, statuses)
    return Object.assign({}, node, {children}, nodeSummary)
})

const leafTotalSummurizer = (node, statuses) => statuses.reduce((accumulator, status) => accumulator + node[status], 0)

const totalSummurizer = (tree, statuses) => tree.map(node => {
    let changes = { total: leafTotalSummurizer(node, statuses)}
    if (node.children) changes['children'] = totalSummurizer(node.children, statuses)
    return Object.assign({}, node, changes)
})

const leafConvertor = (leaf, statuses) => statuses.reduce(
    (accumulator, current) => {
        accumulator[current] = leaf.status === current ? 1 : 0
        return accumulator
    },
    {}
)

const nodeSummarizer = (nodes, statuses) => {
    const summary = nodes.reduce(
        (accumulator, node) => {
            statuses.forEach(field => {
                accumulator[field] = (accumulator[field] || 0) + node[field]
            })
            return accumulator
        },
        {}
    )
    return summary
}

export default fieldsMapper