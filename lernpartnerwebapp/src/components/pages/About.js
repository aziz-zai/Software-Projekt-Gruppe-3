import React from 'react'
import { makeStyles, Paper, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));

/**
 * Shows the about page with the impressum
 * 
 
 */
function About() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h6'>
          LernApp Testing
        </Typography>
        <br />
        <Typography>
          React Frontend written by <Link href='https://github.com/christophkunz'>Christoph Kunz</Link>
        </Typography>
        <Typography>
          Python Backend written by <Link href='https://github.com/PeterThies'>Peter Thies</Link>
        </Typography>
        <br />
        <Typography variant='body2'>
          © Hochschule der Medien 2020, all rights reserved.
        </Typography>
      </div>
    </Paper>
  )
}

export default About;