import React, { useState } from 'react'
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Link } from "react-router-dom"
import { FormControl, FormLabel } from '@material-ui/core'

const CreateRoomPage = (props) => {
    const defaultVotes = 2

    const [guestCanPause, setGuestCanPause] = useState(true)
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes)
    
    
    
    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value)
    }
    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === 'true' ? true : false)
    }
 

    const handleCreateButtonPressed = () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            votes_to_skip: votesToSkip,
            guest_can_pause: guestCanPause,
          }),
        };
        fetch("/api/create-room", requestOptions)
          .then((response) => response.json())
          .then((data) => props.history.push('/room/'+data.code));
      }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography component='h4' variant='h4'>Create A Room</Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <FormControl component='fieldset'>
                        <FormHelperText>
                            <div align='center'>
                                Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
                            <FormControlLabel 
                                value='true' 
                                control={<Radio color='primary' />}
                                label="Play/Pause"
                                labelPlacement='buttom' />
                            <FormControlLabel 
                                value='false' 
                                control={<Radio color='secondary' />}
                                label="No Control"
                                labelPlacement='buttom' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align='center'>
                    <FormControl>
                        <TextField 
                            required={true} 
                            type='number' 
                            default={defaultVotes} 
                            onChange={handleVotesChange}
                            inputProps={{
                                min:1,
                                style:{ textAlign: 'Center'}
                            }}/>
                            <FormHelperText>
                                <div aling="center">Votes Required to Skip Song</div>
                            </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color='primary' variant='contained' onClick={handleCreateButtonPressed}>Create A Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color='secondary' variant='contained' to='/' component={Link}>Back</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateRoomPage
