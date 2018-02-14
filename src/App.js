import React, { Component } from 'react';
import './App.css';


const strToTitle = str => {
  let parts = str.split(" ");
  return parts.map(x => x[0].toUpperCase() + x.slice(1)).join(' ')
}

const FormField = props => (
  <div className="form-group">
    <label>{strToTitle(props.attr.replace('_raw', ''))}</label>
    <input value={props.form.state[props.attr]} onChange={props.form.changeValue} type="text" className="form-control" attr={props.attr.replace('_raw', '')} placeholder={'Enter' + props.attr.replace('_raw', '')} />
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    // Bind change* methods
    this.changeValue = this.changeValue.bind(this);
    this.attributes = ['name', 'rating', 'genre', 'actors_raw'];
    this.state = {
      name: props.name || '',
      rating: props.rating || 0,
      genre: props.genre || '',
      actors_raw: props.actors || '',
      actors: props.actors ? props.actors.split(',').map(x => x.trim()).filter(Boolean).map(strToTitle) : [],
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
    
    // console.log(newState);
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
            <p>genre: <strong>{this.state.genre}</strong></p>
            <p>Actors: {this.state.actors.length ? (<ul>{this.state.actors.map(a => <li>{a}</li>)}</ul>): (<i>No actors</i>) }</p>
          </div>
          <div className="card-footer">
            <h5 className="card-title">Edit form</h5>
            <form>
              {this.attributes.map(x => (<FormField attr={x} form={this}/>))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
