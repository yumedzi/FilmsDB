import React, { Component } from 'react';
import './App.css';


const strToTitle = str => {
  let parts = str.split(" ");
  return parts.map(x => x[0].toUpperCase() + x.slice(1)).join(' ')
}

const FormField = props => (
  <div className="form-group">
    <label>{strToTitle(props.attr.replace('_raw', ''))}</label>
    { props.form.attributesTypes[props.attr] === 'text' ?
        <input value={props.form.state[props.attr]} onChange={props.form.changeValue} 
          type="text" className="form-control" 
          attr={props.attr.replace('_raw', '')} placeholder={'Enter ' + props.attr.replace('_raw', '')} 
        />
      :
        <select value={props.form.state[props.attr]} className="form-control" onChange={props.form.changeValue}
          attr={props.attr.replace('_raw', '')} >
            {props.form.options[props.attr].map(x => <option value={x}>{x}</option>)}
        </select>
    }
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.attributes = [ // To track order 
      'name',
      'rating',
      'genre',
      'actors_raw',
      'recommendation'
    ]
    this.attributesTypes = { // To track type of attribute
      name: 'text',
      genre: 'text',
      actors_raw: 'text',
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
    this.state = {
      name: props.name || '',
      genre: props.genre || '',
      actors_raw: props.actors || '',
      actors: props.actors ? props.actors.split(',').map(x => x.trim()).filter(Boolean).map(strToTitle) : [],
      rating: this.options.rating.includes(props.rating) ? props.rating : 'so-so',
      recommendation: this.options.recommendation.includes(props.recommendation) ? props.recommendation : 'movie experts',
    };
  }

  changeValue = function (event) {
    let newState = {};
    // console.log(event.target);
    const attr = event.target.getAttribute('attr');
    if (attr === 'actors') {
      newState['actors_raw'] = event.target.value;
      newState['actors'] = event.target.value.split(',').map(x => x.trim()).filter(Boolean).map(strToTitle);
    } else {
      newState[attr] = event.target.value;
    }
    
    console.log(newState);
    this.setState(newState);
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            Movie: <strong>{this.state.name}</strong>
          </div>
          <div className="card-body">
            <p>Rating: <strong>{this.state.rating}</strong></p>
            <p>Genre: <strong>{this.state.genre}</strong></p>
            Actors: {this.state.actors.length ? (<ul>{this.state.actors.map(a => <li>{a}</li>)}</ul>): (<i>No actors</i>) }
            <p>Would recommend to: <strong>{this.state.recommendation}</strong></p>
          </div>
          <div className="card-footer">
            <h5 className="card-title">Edit form</h5>
            <form>
              {/* Select-based inputs first */}
              {this.attributes.filter(x => this.attributesTypes[x] === 'select').map(x => (<FormField attr={x} form={this}/>))}

              {/* Text input fields */}
              {this.attributes.filter(x => this.attributesTypes[x] === 'text').map(x => (<FormField attr={x} form={this}/>))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
