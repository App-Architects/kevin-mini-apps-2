import React from 'react';

import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

import Ticker from './components/Ticker';
import Chart from './components/Chart';

const App = () =>  (

  <Grid style={ { paddingLeft: 20 } } columns={2} >
    <GridRow>
      <GridColumn width={3}>
        <Ticker />
      </GridColumn>
      {/* <GridColumn width={2} textAlign='center'>
      </GridColumn> */}
      <GridColumn width={13}>
        <Chart />
      </GridColumn>
    </GridRow>
  </Grid>
)

export default App;