import React from 'react'
import {Route} from 'mobx-router'
import RunsList from './../components/runs-list'
import RunDetails from './../components/run-details'

const views = {
    runsList: new Route({
        path: '/',
        component: <RunsList />,
        beforeEnter: (route, params, store) => {
            store.runs.fetchList()
        }
    }),
    runDetails: new Route({
        path: '/runReport/:id',
        component: <RunDetails />,
        onEnter: (route, params, store, reqParams) => {
            store.app.fetchTestRun(params.id)
        },
        beforeEnter: (route, params, store) => {
            store.app.setActiveView('runDetails')
            store.app.setCurrentFilter('all')
        }

    })
}

export default views