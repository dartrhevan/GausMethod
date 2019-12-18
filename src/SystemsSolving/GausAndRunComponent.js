import React from 'react';
import CalculatorComponent from "../CalculatorComponent";
import './App.css';
import Row from "./Row";
import {calc, runcalc} from './GausMethod'
import Type from "../Type";

class GausAndRunComponent extends CalculatorComponent {
  constructor() {
    super();
    //this.state = { dimension: 4 };
    this.changeDimension = this.changeDimension.bind(this);
    this.state = {
        types: [new Type('Gaus', this.getDescription(), calc), new Type('Run', 'awfdgsfdg', runcalc)],
        dimension: 4, current: 0
    };
    this.getCalculator = this.getCalculator.bind(this);
  }

  changeDimension() {
    const dim = document.getElementById('dim');
      if(dim.value < 2)
      {
          dim.value = 2;
          return;
      }
      if(dim)
        this.setState({ dimension: dim.value, types: this.state.types, current: this.state.current});
  }

  getCalculator() {
      const rows = [];
      for(let i = 0; i < this.state.dimension; i++)
          rows.push(<Row dimension = {this.state.dimension}/>);
      return (<div>
          Размерность:
          <input type='number' className='ent' id='dim' value={this.state.dimension} onChange={this.changeDimension}/>
          <br />
          {rows}
      </div>);
  }

  getDescription() {
      return (<div className='description'>
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
      </div>)
  }
/*
  getTypes() {
      return (<div className='switcher'>
          <div>b</div>
          <div>a</div>
      </div>);
  }*/
}

export default GausAndRunComponent;
