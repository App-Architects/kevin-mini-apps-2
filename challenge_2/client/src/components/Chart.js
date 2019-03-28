import React, { Component } from 'react';
import axios from 'axios';

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
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-03-27')
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
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: cryptoPrice
        }
      ]
    };

    return (
      <div>
        <Line
          data={data}
        />
      </div>
    )
  }
}

export default Chart;