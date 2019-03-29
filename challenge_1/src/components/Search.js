import React, { Component} from 'react';
import axios from 'axios';

import { Grid, Form, Button, GridRow, GridColumn } from 'semantic-ui-react';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: '',
      records: [],
      currentPage: 0,
      _page_limit: 10
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const { keyword } = this.state;
    e.preventDefault();

    axios.get(`/events?q=${keyword}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    // axios.get('/events/')
    // .then((res) => {
    //   const data = res.data;
    //   console.log(data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }

  render() {
    const { keyword } = this.state;
    return (
      <Grid>
        <GridRow>
          <GridColumn width={4}>
            <Form size='massive'>
            <Form.Field
            control='input'
            name='keyword'
            placeholder='insert keyword'
            value={keyword}
            onChange={this.handleChange}
            >
            </Form.Field>
            </Form>
            <br />
            <Button type='submit' onClick={this.handleSubmit} size='big'>Search</Button>
          </GridColumn>
        </GridRow>
      </Grid>
    )
  }
}

export default Search;