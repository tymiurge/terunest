const fs = require('fs')
const path = require('path')



listReports = dir => fs.readdirSync(dir).reduce(
    (list, file) => {
        const name = path.join(dir, file)
        const isDir = fs.statSync(name).isDirectory()
        return isDir ? list : list.concat([name])
    },
    []
)

mainReportsContent = reportsDir => listReports(reportsDir).reduce(
    (arr, file) => arr.concat(JSON.parse([fs.readFileSync(file, 'utf8')])),
    []
)

module.exports = mainReportsContent
