import { observable, computed } from 'mobx'

class RunsListStore {

    @observable list = []

    @observable filter = ''

    fetchList () {
      fetch('/runsList')
        .then(resp => resp.json())
        .then(data => {
          this.list = data
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
