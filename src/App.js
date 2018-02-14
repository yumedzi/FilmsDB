import React, { Component } from 'react';
import './App.css';


const strToTitle = str => {
  let parts = str.split(" ");
  return parts.map(x => x[0].toUpperCase() + x.slice(1)).join(' ')
}

const splitAndTrim = str => str.split(',').map(x => x.trim()).filter(Boolean);

const FormField = props => (
  <div className="form-group row">
    <label for={props.attr} className="col-sm-3 col-form-label">{strToTitle(props.attr.replace('_raw', ''))}</label>
    <div className="col-sm-8">
      { props.form.attributesTypes[props.attr] === 'text' ?
          <input value={props.form.state[props.attr]} onChange={props.form.changeValue} 
            type="text" className="form-control" id={props.attr} key={props.attr}
            attr={props.attr.replace('_raw', '')} placeholder={'Enter ' + props.attr.replace('_raw', '')} 
          />
        :
          <select value={props.form.state[props.attr]} className="form-control" onChange={props.form.changeValue}
            attr={props.attr.replace('_raw', '')} key={props.attr.replace('_raw', '')}>
              {props.form.options[props.attr].map(x => <option key={x} value={x}>{x}</option>)}
          </select>
      }
    </div>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.attributes = [ // To track order 
      'name',
      'rating',
      'description',
      'genres_raw',
      'actors_raw',
      'recommendation'
    ]
    this.attributesTypes = { // To track type of attribute
      name: 'text',
      description: 'text',
      genres_raw: 'text',
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
      description: props.description || '',
      genres_raw: props.genres || '',
      genres: props.genres ? splitAndTrim(props.genres).map(strToTitle) : [],
      actors_raw: props.actors || '',
      actors: props.actors ? splitAndTrim(props.actors).map(strToTitle) : [],
      rating: this.options.rating.includes(props.rating) ? props.rating : 'so-so',
      recommendation: this.options.recommendation.includes(props.recommendation) ? props.recommendation : 'movie experts',
    };
  }

  changeValue = function (event) {
    let newState = {};
    console.log(event.target);
    const attr = event.target.getAttribute('attr');
    if (this.attributes.includes(`${attr}_raw`)) {
      newState[`${attr}_raw`] = event.target.value;
      newState[attr] = event.target.value.split(',').map(x => x.trim()).filter(Boolean).map(strToTitle);
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
            <details open="true">
              <summary>Description: </summary>
              <p><i>{this.state.description}</i></p>
            </details>
            <p>Rating: <strong><mark>{this.state.rating}</mark></strong></p>
            <p>Genres: {this.state.genres.map(x => (<span className="badge badge-primary spacey">{x}</span>))}</p>
            Actors: {this.state.actors.length ? (<ul>{this.state.actors.map(a => <li>{a}</li>)}</ul>): (<i>No actors</i>) }
            <p>Would recommend to: <strong>{this.state.recommendation}</strong></p>
          </div>
          <div className="card-footer">
            <h5 className="card-title">Edit form</h5>
            <form>
              {/* Text-based inputs go first */}
              {this.attributes.map(x => (<FormField attr={x} form={this}/>))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
