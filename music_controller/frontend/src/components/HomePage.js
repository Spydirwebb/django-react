import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from './CreateRoomPage'
import LaunchPage from './LaunchPage'
import Room from './Room'

const HomePage = () => {
    const [roomCode, setRoomCode] = useState(null)


    useEffect(() => {
            fetch('/api/user-in-room')
                .then((response) => response.json())
                .then((data) => {
                    setRoomCode(data.code)
                })

    }, [])
    
    const clearRoomCode = () => {
        setRoomCode(null)
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact render={()=> {
                        return roomCode ? <Redirect to={`/room/${roomCode}`} /> : <LaunchPage />
                    }} /> 
                    <Route path='/join' component={RoomJoinPage} />
                    <Route path='/create' component={CreateRoomPage} />
                    <Route path="/room/:roomCode" 
                        render={(props) => {
                            return <Room {...props} leaveRoomCallBack={clearRoomCode} />
                        }} 
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default HomePage
