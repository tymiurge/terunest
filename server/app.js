// server/app.js
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const v4 = require('uuid/v1');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/runsList', (req, res) => {
  
  const response = 
  [
      {
        id: v4(), runTitle: 'BRAND NO NAME', stageName: 'stage-00',
        initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
        total: 80, passed: 75, failed: 0, skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 2 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '65', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 3 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '65', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 4 run', stageName: 'stage-00',
        initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
        total: 80, passed: '63', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 5 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '73', failed: 0, skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 6 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '77', failed: 0, skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 7 run', stageName: 'stage-00',
        initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
        total: 80, passed: '63', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 8 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '65', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 9 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '65', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 10 run', stageName: 'stage-00',
        initiator: 'fiona', startAt: '10/10/17, 21:45', duration: '26v, 45s',
        total: 80, passed: '63', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 11 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '65', failed: '12', skipped: 5
      },
      {
        id: v4(), runTitle: 'brand name 12 run', stageName: 'stage-00',
        initiator: 'shrek', startAt: '10/10/17, 21:45', duration: '23v, 41s',
        total: 78, passed: '77', failed: 0, skipped: 5
      }
  ]
  res.json(response)
})

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});



module.exports = app;