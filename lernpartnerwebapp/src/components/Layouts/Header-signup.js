import React from 'react'
import {makeStyles} from '@material-ui/core'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import Logo from '../logo.svg'

const useStyles = makeStyles((theme) => ({
    appbar:{
        background: 'none'
    },
}))

export default function Header_signup() {
    const classes = useStyles();
    return(
    <div>
        <AppBar className={classes.appbar} elevation={0} position='static'>
            <Toolbar>
                <img src={Logo} width="50" alt=""/>
                <Typography variant='h6' style={{flexGrow : 1 }}>
                    LernApp
                </Typography>
                <Button color='inherit'>
                    About
                </Button>
                <Button color='inherit'>
                    Login
                </Button>
            </Toolbar>
        </AppBar>    
    </div>
    );
}