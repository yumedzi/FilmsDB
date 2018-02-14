import React from "react";
import { render } from "react-dom";


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};


class FilmForm extends React.Component {
  constructor(props) {
    super(props);
    // Bind change* methods
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      name: '',
      rating: 0,
      jenre: '',
      actors: [],
    };
  }

  changeValue = function (event) {
    let newState = {};
    // console.log(event.target);
    const attr = event.target.getAttribute('attr');
    if (attr === 'actors') {
      newState[attr] = event.target.value.split(',').map(x => x.trim()).filter(Boolean);
    } else {
      newState[attr] = event.target.value;
    }
    
    console.log(newState);
    this.setState(newState);
  };

  render() {
    return (
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
              <input value={this.name} onChange={this.changeValue} type="text" className="form-control" attr="name" placeholder="Enter " />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input value={this.rating} onChange={this.changeValue} type="text" className="form-control" attr="rating" placeholder="Enter" />
            </div>
            <div className="form-group">
              <label>Jenre</label>
              <input value={this.rating} onChange={this.changeValue} type="text" className="form-control" attr="jenre" placeholder="Enter" />
            </div>
            <div className="form-group">
              <label>Actors</label>
              <input value={this.rating} onChange={this.changeValue} type="text" className="form-control" attr="actors" placeholder="Enter" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

render(<FilmForm />, document.getElementById("root"));
