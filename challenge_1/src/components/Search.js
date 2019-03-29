import React, { Component} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {
  Grid,
  Form,
  Button,
  Container,
  GridRow,
  GridColumn,
  Header,
  Icon,
  Image,
  List,
} from 'semantic-ui-react';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: '',
      records: [],
      recordsLimit: [],
      countPage: 1
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleKeyPress(e) {
    const { keyword } = this.state;

    if (e.key === 'Enter') {
      e.preventDefault();
      axios.get(`/events?q=${keyword}`)
      .then((res) => {
        const data = res.data;
        this.setState({
          records: data,
          recordsLimit: data.slice(0, 10),
          countPage: Math.ceil(data.length / 10)
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  handleSubmit(e) {
    const { keyword } = this.state;
    e.preventDefault();

    axios.get(`/events?q=${keyword}`)
      .then((res) => {
        const data = res.data;
        this.setState({
          recordsLimit: data.slice(0, 10)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageClick(data) {
    const { keyword } = this.state;

    axios.get(`/events?q=${keyword}&_page=${data.selected + 1}&_limit=10`)
      .then((res) => {
        const data = res.data;
        this.setState({
          recordsLimit: data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { keyword, recordsLimit, countPage } = this.state;
    return (
      <Grid>
        <GridRow centered>
          <Image src='https://s3.amazonaws.com/moodappmvp/miniapps/world.jpg' size='huge'/>
        </GridRow>
        <br />
        <Container textAlign='center'>
          <Header as='h1' style={{ fontSize: 40 }}>Historical Events Finder</Header>
        </Container>
        <GridRow centered>
          <GridColumn width={4} style={{ paddingLeft: 30 }}>
            <Form size='massive'>
            <Form.Field
            control='input'
            name='keyword'
            placeholder='insert keyword'
            value={keyword}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            style={{ paddingLeft:20 }}
            >
            </Form.Field>
            </Form>
            <br />
            <Container textAlign='center'>
            <Button primary type='submit' onClick={this.handleSubmit} size='big'>Search</Button>
            </Container>
            < br />
            <ReactPaginate
              // containerClassName='ui container three column grid'
              previousLabel={<Icon name= 'angle left' size='big'/>}
              nextLabel={<Icon name= 'angle right' size='big' />}
              pageCount={countPage}
              marginPagesDisplayed={10}
              pageRangeDisplayed={10}
              onPageChange={this.handlePageClick}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
          {recordsLimit.map(record =>
            <List key={recordsLimit.indexOf(record)} size="massive" style={{ paddingLeft: 20 }}>
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