import React from 'react'
import {Container} from '@material-ui/core'
import AppAPI from './api/AppAPI'

function App() {
  return (
    <div>
    <Container>
    <AppAPI>
    {getPersonURL()}
    </AppAPI>
    </Container>
    </div>
  );
}

export default App;

