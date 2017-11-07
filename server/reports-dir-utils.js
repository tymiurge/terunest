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

exports.getMainReports = reportsDir => listReports(reportsDir).reduce(
    (arr, file) => arr.concat(JSON.parse([fs.readFileSync(file, 'utf8')])),
    []
)

exports.getRunReport = (dir, reportId) => {
    const reportDir = path.join(dir, reportId)
    if (!fs.statSync(reportDir).isDirectory()) {
        throw reportId + ' is not a dir'
    }
    return JSON.parse(fs.readFileSync(path.join(reportDir, 'details.json')))
}
