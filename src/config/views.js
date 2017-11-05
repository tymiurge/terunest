import React from 'react'
import {Route} from 'mobx-router'
import RunsList from './../components/runs-list'
import RunDetails from './../components/run-details'

const views = {
    runsList: new Route({
        path: '/',
        component: <RunsList />,
        onEnter: (route, params, store) => {
            store.app.setActiveView('runsList')
        }
    }),
    runDetails: new Route({
        path: '/run/:id',
        component: <RunDetails />,
        beforeEnter: (route, params, store) => {
            store.app.setRunId(params.id)
        },
        onEnter: (route, params, store) => {
            store.app.setActiveView('runDetails')
        }
    })
}

export default views