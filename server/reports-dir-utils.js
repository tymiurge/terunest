const fs = require('fs')
const path = require('path')

const reportsDir = path.resolve(__dirname, '..', 'reports')

listReports = dir => fs.readdirSync(dir).reduce(
    (list, file) => {
        const name = path.join(dir, file)
        const isDir = fs.statSync(name).isDirectory()
        return isDir ? list : list.concat([name])
    },
    []
)

mainReportsContent = reportsDir => listReports(reportsDir).reduce(
    (arr, file) => arr.concat([fs.readFileSync(file, 'utf8')]),
    []
)

export default mainReportsContent
