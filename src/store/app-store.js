import { observable } from 'mobx'

class AppStore {
    @observable testRuns = []
    loadedRun = {}
}

export default AppStore
