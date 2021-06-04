import React from 'react'
import {IconButton, makeStyles} from '@material-ui/core'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    appbar:{
        background: 'none'
    },
  }))

export default function Header_after_login() {
    const classes = useStyles();
  return(
    <div>
        <AppBar className={classes.appbar} elevation={0} position='static'>
            <Toolbar>
                <Typography variant='h6' style={{flexGrow : 1 }}>
                LernApp
                </Typography>
                <Button color='inherit'>
                    About
                </Button>
            </Toolbar>
        </AppBar>    
        
    </div>
  );
}