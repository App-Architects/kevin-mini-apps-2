import React, { Component } from 'react';
import axios from 'axios';
import { GridColumn, GridRow, Header, Segment } from 'semantic-ui-react';

import { Line } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoTime : [],
      cryptoPrice : [],
    }
  }

  componentDidMount() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-09-27&end=2019-04-04')
      .then((res) => {
        const data = res.data.bpi;
        const cryptoTime = Object.keys(data);
        const cryptoPrice = Object.values(data);
        this.setState({
          cryptoTime,
          cryptoPrice
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }

  render() {
    const { cryptoTime, cryptoPrice } = this.state;

    const data = {
      labels: cryptoTime,
      datasets: [
        {
          label: 'BTC Price History',
          fill: false,
          lineTension: 0,
          backgroundColor: '#1E1EA9',
          borderColor: '#1E1EA9',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#ffffff',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: '#1E1EA9',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: cryptoPrice
        }
      ]
    };

    return (
        <Segment inverted>
        <GridRow>
          <Header
            content='BTC Price History'
            size='huge'
            style={{ fontSize: 40 }}
            inverted color = 'white'
          />
          <GridColumn width={16}>
            <Line
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                  display: true,
                  labels: {
                    fontColor: 'white',
                    fontSize: 20
                  }
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: '$USD',
                      fontColor: 'white',
                      fontSize: 25
                    },
                    ticks: {
                      fontColor: 'white',
                      fontSize: 20,
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'DATE',
                      fontColor: 'white',
                      fontSize: 25
                    },
                    ticks: {
                      fontColor: 'white',
                      fontSize: 20
                    }
                  }]
                }
              }}
            />
          </GridColumn>
        </GridRow>
        </Segment>
    )
  }
}

export default Chart;