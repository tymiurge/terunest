import {RouterStore} from 'mobx-router'
import RunDetailsStore from './app-run-details'
import RunsListStore from './app-runs-list'

const store = {
    app: new RunDetailsStore(),
    runs: new RunsListStore(),
    router: new RouterStore()
}
export default store
