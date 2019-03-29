import React, { Component} from 'react';
import axios from 'axios';

import {
  Grid,
  Form,
  Button,
  Container,
  GridRow,
  GridColumn,
  Image,
  List
} from 'semantic-ui-react';


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
      this.setState({
        records: data
      })
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
    const { keyword, records } = this.state;
    return (
      <Grid>
        <GridRow centered>
          <Image src='https://s3.amazonaws.com/moodappmvp/miniapps/world.jpg' size='huge'/>
        </GridRow>
        <GridRow centered>
          <GridColumn width={4} style={{ paddingLeft: 30 }}>
            <Form size='massive'>
            <Form.Field
            control='input'
            name='keyword'
            placeholder='insert keyword'
            value={keyword}
            onChange={this.handleChange}
            style={{ paddingLeft:20 }}
            >
            </Form.Field>
            </Form>
            <br />
            <Container textAlign='center'>
            <Button primary type='submit' onClick={this.handleSubmit} size='big'>Search</Button>
            </Container>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
          {records.map(record =>
        <List key={records.indexOf(record)} size="massive" style={{ paddingLeft: 20 }}>
        <List.Item>
          <List.Icon name='globe' />
          <List.Content>{record.category2}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='calendar alternate outline' />
          <List.Content>{record.date}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='write' />
          <List.Content>{record.description}</List.Content>
        </List.Item>
        </List>
        )}
          </GridColumn>
        </GridRow>
      </Grid>
    )
  }
}

export default Search;