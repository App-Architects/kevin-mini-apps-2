import React from 'react';

import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

import Chart from './components/Chart';
import CryptoForm from './components/CryptoForm';

const App = () =>  (

  <Grid style={ { paddingLeft: 20 } } columns={2} >
    <GridRow>
      <GridColumn width={3} textAlign='center' style={{ paddingLeft: 20 }}>
        <CryptoForm />
      </GridColumn>
      <GridColumn width={10} textAlign='center'>
        <Chart />
      </GridColumn>
    </GridRow>
  </Grid>
)

export default App;