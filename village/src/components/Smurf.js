import React from 'react';
import axios from 'axios';

class Smurf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      height: this.props.height,
      age: this.props.age,
    }
  }

  componentDidMount() {
    if(this.props.match) {
      axios.get('http://localhost:3333/smurfs')
        .then(res => {
          const smurf = res.data.filter(smurf => `${smurf.id}` === this.props.match.params.id)[0]
          console.log(this.props.match.params.id);
          this.setState({ ...smurf })
        })
        .catch(err => console.log(err.response));
      }
    }

  render() {
    return (
      <div className="Smurf">
        <h3>{this.state.name}</h3>
        <strong>{this.state.height} tall</strong>
        <p>{this.state.age} smurf years old</p>
      </div>
    );
  }
};

export default Smurf;

