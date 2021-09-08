import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from './CreateRoomPage'

const HomePage = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <p>This is the home page</p>
                    </Route>
                    <Route path='/join' component={RoomJoinPage}></Route>
                    <Route path='/create' component={CreateRoomPage}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default HomePage
