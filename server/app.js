const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const v4 = require('uuid/v1')
const fsReports = require('./reports-dir-utils')

// app settings
const reportsDir = path.resolve(__dirname, '..', 'reports')

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/runsList', (req, res) => {
  const runsList = fsReports.getMainReports(reportsDir)
  res.json(runsList)
})

app.get('/runReport/:id', (req, res) => {
  const id = req.params.id
  const runReport = fsReports.getRunReport(reportsDir, id)
  res.json(runReport) 
})

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app
