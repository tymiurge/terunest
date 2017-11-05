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
            store.app.setActiveView('runDetails')
            store.app.setCurrentFilter('all')
            store.app.fetchTestRun(params.id)
        },
        onEnter: (route, params, store) => {
            
        }
    })
}

export default views