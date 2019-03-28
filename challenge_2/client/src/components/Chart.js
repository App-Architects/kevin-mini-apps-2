import React, { Component } from 'react';
import axios from 'axios';

import { Line } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoData : []
    }
  }

  componentDidMount() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-03-27')
      .then((res) => {
        const data = res.data;
        console.log(data)
        this.setState({
          cryptoData: data
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }

  render() {
    return (
      <div>
      <h1>Hello there</h1>
      </div>
    )
  }
}

export default Chart;