import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  componentDidMount() {
    if(this.props.match) {
      axios.get('http://localhost:3333/smurfs')
        .then(res => {
          const smurf = res.data.filter(smurf => `${smurf.id}` === this.props.match.params.id)[0];
          this.setState({ ...smurf })
        })
        .catch(err => console.log(err.response));
      }
    }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios.post('http://localhost:3333/smurfs', this.state)
      .then(res => this.props.updateList(res.data))
      .catch(err => console.log(err.response));
    this.setState({
      name: '',
      age: '',
      height: ''
    });
    this.props.history.push(`/`);
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

export default SmurfForm;
