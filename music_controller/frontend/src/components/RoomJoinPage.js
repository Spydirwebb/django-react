import React, {useState} from 'react'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const RoomJoinPage = (props) => {
    const [roomCode, setRoomCode] = useState();
    const [error, setError] = useState("")

    const handleRoomCodeChange = (e) => {
        setRoomCode(e.target.value)
    }

    const handleEnterRoomButtonPressed = () => {
        console.log(roomCode)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: roomCode,
            }),
          };
        fetch('/api/join-room', requestOptions).then((response) => {
            if(response.ok){
                props.history.push(`/room/${roomCode}`)
            }else{
                setError("Room Not Found")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <Grid container spacing={1} alignITems="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error={error}
                        label="Code"
                        placeholder="Enter a Room Code"
                        value={roomCode}
                        onChange={handleRoomCodeChange}
                        helperText={error}
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" component ={Link} onClick={handleEnterRoomButtonPressed}>
                        Enter Room
                    </Button>
                </Grid>  
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component ={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default RoomJoinPage
