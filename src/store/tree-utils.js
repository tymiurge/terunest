const leafsNumber = tree => tree.reduce(
    (accumulator, node) => {
        if (!node.children) return accumulator + 1
        return accumulator + leafsNumber(node.children)
    },
    0
)

export { leafsNumber }