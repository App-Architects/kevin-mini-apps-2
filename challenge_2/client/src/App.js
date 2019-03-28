import React from 'react';

import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

import Chart from './components/Chart';

const App = () =>  (

  <Grid style={ {paddingLeft: 20 }} columns={2} >
    <GridRow>
      <GridColumn width={2} textAlign='center'>
      </GridColumn>
      <GridColumn width={12}>
        <Chart />
      </GridColumn>
    </GridRow>
  </Grid>
)

export default App;