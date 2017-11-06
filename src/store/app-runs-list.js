import { observable, computed } from 'mobx'
import { v4 } from 'js-uuid'
import API from 'fetch-api'

class RunsListStore {

    @observable list = []

    @observable filter = ''

    fetchList () {
      let api = new API({
        baseURI: 'http://localhost:9000'
      })   
      api.get('/runsList', (err, res) => {
        if (err) throw err
        this.list = JSON.parse(res)
      })
    }

    @computed get displayed() {
        return this.filter === ''
            ? this.list
            : this.list.filter(item => {
                return item.runTitle.includes(this.filter)
                    || item.stageName.includes(this.filter)
                    || item.initiator.includes(this.filters)
            })
    }
}

export default RunsListStore