import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Breadcrumb } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'
import views from './../config/views'

@inject('store')
@observer
class MainMenu extends Component {
    render () {
        const {store} = this.props
        const {router: {goTo}} = store
        return (
            <Menu pointing secondary>
                <Menu.Item>
                    <Breadcrumb>
                        <Breadcrumb.Section
                            link={store.app.activeView !== 'runsList'}
                            onClick={() => {
                                if (store.app.activeView !== 'runList') {
                                    goTo(views.runsList, {}, store)
                                }
                            }}
                        >
                            Runs List
                        </Breadcrumb.Section>
                        {
                        store.app.activeView !== 'runsList' &&
                        <Breadcrumb.Divider icon='right angle' />
                        }
                        {
                        store.app.activeView !== 'runsList' &&
                        <Breadcrumb.Section>Run Details</Breadcrumb.Section>
                        }
                    </Breadcrumb>
                </Menu.Item>
            </Menu>
        )
        
    }
}

export default MainMenu

