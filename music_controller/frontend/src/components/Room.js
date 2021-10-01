import React, {useState, useEffect} from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import CreateRoomPage from './CreateRoomPage'


const Room = (props) => {
    const [votesToSkip, setVotesToSkip] = useState(2)
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const [showSetting, setShowSettings] = useState(false)

    const roomCode = props.match.params.roomCode

    const getRoomDetails = () => {
        fetch('/api/get-room'+'?code='+roomCode)
            .then((response) => {
                if(!response.ok) {
                    props.leaveRoomCallBack();
                    props.history.push('/')
                }
                return response.json()
            })
            .then((data) => {
                setVotesToSkip(data.votes_to_skip),
                setGuestCanPause(data.guest_can_pause),
                setIsHost(data.is_host)
            })
    }

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        fetch('/api/leave-room', requestOptions)
            .then((_response) => {
                props.leaveRoomCallBack();
                props.history.push('/');
            })
    }
    
    useEffect(() => {
        getRoomDetails();    
    }, [])

    const renderSettings = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={votesToSkip} 
                        guestCanPause={guestCanPause} 
                        roomCode={roomCode}
                        updateCallBack={null}
                    />
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary' 
                        onClick={() => setShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }
    
    const renderSettingsButton = () => {
        return(
            <Grid item xs={12} align="center">
                <Button variant='contained' color='primary' onClick={() => setShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        )    
    }
    if(showSetting){
        return renderSettings();
    }
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes: {votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest Can Pause: {guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Host: {isHost.toString()}
                    </Typography>
                </Grid>
                { isHost ? renderSettingsButton() : null }
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
                </Grid>
            </Grid>
        </div>

        
    )
}



export default Room
