import React from 'react'
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

const CreateRoomPage = () => {
    const defaultVotes = 2
    
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
                        <RadioGroup row defaultValue='true'>
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
            </Grid>
        </div>
    )
}

export default CreateRoomPage
