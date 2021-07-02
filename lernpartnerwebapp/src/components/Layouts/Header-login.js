import React from 'react'
import {makeStyles} from '@material-ui/core'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    appbar:{
        background: 'none'
    },
}))

export default function Header_login() {
    const classes = useStyles();
    return(
    <div>
        <AppBar className={classes.appbar} elevation={0} position='static'>
        </AppBar>    
    </div>
    );
}