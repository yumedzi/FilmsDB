import React, { Component } from 'react';
import {Grid, Col, Row, Panel, Form, FormGroup, Badge, FormControl} from 'react-bootstrap'; // eslint-disable-line no-unused-vars
import './App.css';


const strToTitle = str => {
  let parts = str.split(" ");
  return parts.map(x => x[0].toUpperCase() + x.slice(1)).join(' ')
}

const splitAndTrim = str => str.split(',').map(x => x.trim()).filter(Boolean);

const FormField = ({form, attr}) => {
  const attr_clean = attr.replace('_list', '');
  const attr_raw = attr.replace('_list', '_raw');
  const type = form.attributesTypes[attr];

  return <FormGroup>
    <Col sm={3}>
      {strToTitle(attr_clean)}
    </Col>
    <Col sm={8}>
      <FormControl 
        componentClass={type}
        placeholder={`Enter ${attr_clean}`} 
        attr={attr}
        onChange={form.changeValue} 
        value = {form.state[attr_raw]}
      >
        {type === 'select' ? form.options[attr].map((x,i) => (<option key={i} value={x}>{x}</option>)) : null}
      </FormControl>
    </Col>
  </FormGroup>
};

class App extends Component {
  constructor(props) {
    super(props);
    this.attributes = [ // To track order 
      'name',
      'rating',
      'description',
      'genres_list',
      'actors_list',
      'recommendation'
    ]
    this.attributesTypes = { // To track Form Field type of attribute
      name: 'input',
      description: 'input',
      genres_list: 'input',
      actors_list: 'input',
      rating: 'select',
      recommendation: 'select'
    };
    this.options = {
      rating: ['super', 'great', 'so-so', 'bad', 'eyes-bleeding'],
      recommendation: ['everybody', 'movie experts', 'friends', 'enemies only']
    }

    // Bind change* methods
    this.changeValue = this.changeValue.bind(this);

    // Default state
    this.state = {};
    this.attributes.map(x => { // eslint-disable-line array-callback-return
      if (x.endsWith('_list')) {
        let value = props[x.replace('_list', '')];
        // E.g.: state.actors_list = ["Bruce Willis", "Uma Turman"]
        //       state.actors_raw = "Bruce Willis, Uma Turman"
        this.state[x] = value ? splitAndTrim(value).map(strToTitle) : [];
        this.state[x.replace('_list', '_raw')] = value || '';
      } else {
        // E.g.: state.name = "Django unchained"
        this.state[x] = props[x] || ''
      }
    });
  }

  changeValue = function (event) {
    let newState = {};
    // console.log(event.target);
    const attr = event.target.getAttribute('attr');
    if (attr.endsWith('_list')) {
      const attr_raw = attr.replace('_list', '_raw');
      newState[attr_raw] = event.target.value;
      newState[attr] = event.target.value.split(',').map(x => x.trim()).filter(Boolean).map(strToTitle);
    } else {
      newState[attr] = event.target.value;
    }
    
    // console.log(newState);
    this.setState(newState);
  };

  render() {
    return (
      <Grid>
        <Panel>
          <Panel.Heading>
            Movie: <strong>{this.state.name}</strong>
          </Panel.Heading>
          <Panel.Body>
            <details open="true">
              <summary>Description: </summary>
              <p><i>{this.state.description}</i></p>
            </details>
            <p>Rating: <strong><mark>{this.state.rating}</mark></strong></p>
            <p>Genres: {this.state.genres_list && this.state.genres_list.map((x,i) => <Badge key={i}>{x}</Badge>)}</p>
            Actors: {this.state.actors_list.length ? <ul>{this.state.actors_list.map((x,i) => <li key={i}>{x}</li>)}</ul> : <i>No actors</i>}
            <p>Would recommend to: <strong><mark>{this.state.recommendation}</mark></strong></p>
          </Panel.Body>
          <Panel.Footer>
            <h4>Edit form</h4>
            <Form horizontal>
              {this.attributes.map(x => (<FormField key={x} attr={x} form={this}/>))}
            </Form>
          </Panel.Footer>
        </Panel>
      </Grid>
    );
  }
}

export default App;
