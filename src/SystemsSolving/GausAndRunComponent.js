import React from 'react';
import './App.css';
import Row from "./Row";
import {calc, runcalc} from './GausMethod'

class GausAndRunComponent extends React.Component {
  constructor() {
    super();
    this.state = { dimension: 4 };
    this.changeDimension = this.changeDimension.bind(this);
  }

  changeDimension() {
    const dim = document.getElementById('dim');
      if(dim.value < 2)
      {
          dim.value = 2;
          return;
      }
      if(dim !== undefined && dim !== null)
        this.setState({ dimension: dim.value});
  }

  render() {
    const rows = [];
    for(let i = 0; i < this.state.dimension; i++)
      rows.push(<Row dimension = {this.state.dimension}/>);
    return (
        <div className='calculator'>
            <div className='switcher'>
                <div>b</div>
                <div>a</div>
            </div>
          hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
          <br/>
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            <br/>
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            <br/>
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            <br/>
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            <br/>
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            <br/>
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            hghjjbskjafsfaldm
            <br/>
          <hr/>
          <div align='center'>
              Размерность:
              <input type='number' className='ent' id='dim' value={this.state.dimension} onChange={this.changeDimension}/>
              <br />
              {rows}
              <button  onClick={calc}>Calc</button>
              <button onClick={runcalc}>RunCalc</button>
              <label id='res'></label>
          </div>
        </div>

    );
  }
}

export default GausAndRunComponent;
