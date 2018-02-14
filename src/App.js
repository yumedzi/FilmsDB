import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    // Bind change* methods
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      name: props.name || '',
      rating: props.rating || 0,
      jenre: props.jenre || '',
      actors_raw: props.actors || '',
      actors: props.actors ? props.actors.split(',').map(x => x.trim()).filter(Boolean) : [],
    };
  }

  changeValue = function (event) {
    let newState = {};
    // console.log(event.target);
    const attr = event.target.getAttribute('attr');
    if (attr === 'actors') {
      newState['actors_raw'] = event.target.value;
      newState['actors'] = event.target.value.split(',').map(x => x.trim()).filter(Boolean);
    } else {
      newState[attr] = event.target.value;
    }
    
    console.log(newState);
    this.setState(newState);
  };

  render() {
    return (
      <div className="container">
      {/* <div className="row"> */}
        <div className="card">
          <div className="card-header">
            Movie: <strong>{this.state.name}</strong>
          </div>
          <div className="card-body">
            <p>Rating: <strong>{this.state.rating}</strong></p>
            <p>Jenre: <strong>{this.state.jenre}</strong></p>
            <p>Actors: {this.state.actors.length ? (<ul>{this.state.actors.map(a => <li>{a}</li>)}</ul>): (<i>No actors</i>) }</p>
          </div>
          <div className="card-footer">
            <h5 className="card-title">Edit form</h5>
            <form>
              <div className="form-group">
                <label>Movie name</label>
                <input value={this.state.name} onChange={this.changeValue} type="text" className="form-control" attr="name" placeholder="Enter " />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input value={this.state.rating} onChange={this.changeValue} type="text" className="form-control" attr="rating" placeholder="Enter" />
              </div>
              <div className="form-group">
                <label>Jenre</label>
                <input value={this.state.jenre} onChange={this.changeValue} type="text" className="form-control" attr="jenre" placeholder="Enter" />
              </div>
              <div className="form-group">
                <label>Actors</label>
                <input value={this.state.actors_raw} onChange={this.changeValue} type="text" className="form-control" attr="actors" placeholder="Enter" />
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
    );
  }
}

// render(<App />, document.getElementById("root"));

export default App;
