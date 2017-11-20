import { observable, computed } from 'mobx'

class RunsListStore {

    @observable list = []

    @observable filter = ''

    setList (rawList) {
        this.list = rawList.map(item => Object.assign({}, item, {runTitle: item.brand + '-' + item.runType}))
    }

    fetchList () {
      fetch('/runsList')
        .then(resp => resp.json())
        .then(data => {
          this.setList(data)
        })
    }

    @computed get displayed() {
        return this.filter === ''
            ? this.list
            : this.list.filter(item => {
                return item.runTitle.includes(this.filter)
                    || item.stageName.includes(this.filter)
                    || item.initiator.includes(this.filter)
            })
    }
}

export default RunsListStore
