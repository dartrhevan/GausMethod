import React from 'react';
import './App.css';
import Row from "./Row";
import calc from './GausMethod'

class App extends React.Component {
  constructor() {
    super();
    this.state = { dimension: 4 };
    this.changeDimension = this.changeDimension.bind(this);
  }

  changeDimension() {
    const dim = document.getElementById('dim');
    if(dim !== undefined && dim !== null)
      this.setState({ dimension: dim.value});
  }

  render() {
    const rows = [];
    for(let i = 0; i < this.state.dimension; i++) {
      rows.push(<Row dimension ={this.state.dimension}/>);
      rows.push(<br/>);
    }
    return (
        <div>
          Размерность:
          <input type='number' className='ent' id='dim' value={this.state.dimension} onChange={this.changeDimension}/>
          <br />
          {rows}
          <button onClick={calc}>Calc</button>
        </div>

    );
  }
}

export default App;
