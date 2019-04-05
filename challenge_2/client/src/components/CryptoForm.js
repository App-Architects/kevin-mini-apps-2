import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../config/keys';
import { Form } from 'semantic-ui-react';

class CryptoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: '',
      crytoData: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({
      quote: e.target.value
    })
  }

  handleKeyPress(e) {
    const { quote } = this.state;

    if (e.key === 'Enter') {
      e.preventDefault();
      axios.get(`https://coinlib.io/api/v1/coin?key=${config.api_key}&symbol=${quote}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => {
          const data = res.data;
          this.setState({
            crytoData: data
          })
          .catch(err => console.log(err))
        })
    }
  }

  render() {
    const { quote } = this.state;

    return (
      <div>
      <Form size='huge'>
        <Form.Field
          name='quote'
          value={quote}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        >
          <label>Cryto Coin</label>
          <input />
        </Form.Field>
      </Form>
      </div>
    )
  }
}

export default CryptoForm;