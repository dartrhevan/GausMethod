import React from 'react';
import CalculatorComponent from "../CalculatorComponent/CalculatorComponent";
import './App.css';
import Row from "./Row";
import {calc, runcalc} from './GausMethod';
import Type from "../CalculatorComponent/Type";
import {SystemSolvingResult} from "./SystemSolvingResult";

const CoefficientsResults = props => (
        <table className='coefTable' border='1'>
            <tbody>
                <tr>
                    <td>i</td> {props.coefs.us.map((u, i) => <td>{i}</td>)}
                </tr>
                <tr>
                    <td>U</td> {props.coefs.us.map((u, i) => <td>{u.toFixed(3)}</td>)}
                </tr>
                <tr>
                    <td>V</td> {props.coefs.vs.map((v, i) => <td>{v.toFixed(3)}</td>)}
                </tr>
            </tbody>
        </table>
    );

class GausAndRunComponent extends CalculatorComponent {
  constructor() {
    super();
    //this.state = { dimension: 4 };
    this.changeDimension = this.changeDimension.bind(this);
    const gausHdl = () => {
        const s = calc();
        this.setState(this.getNewState({result: s}));
    };
    const runHdl = () => {
          const s = runcalc();
          this.setState(this.getNewState({result: s}));
    };
    this.state = {
        types: [new Type('Gaus', this.getDescription(), gausHdl.bind(this)), new Type('Run', 'awfdgsfdg', runHdl.bind(this))],
        dimension: 2, current: 0, result: null
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
        this.setState(this.getNewState({dimension: dim.value, result: null}));
  }

  getCalculator() {
      const rows = [];
      for(let i = 0; i < this.state.dimension; i++)
          rows.push(<Row dimension = {this.state.dimension}/>);
      return (<>
          Размерность:
          <input type='number' className='ent' id='dim' value={this.state.dimension} onChange={this.changeDimension}/>
          <br />
          <div className='rows'>
              {rows}
          </div>
          {this.state.result ? (!(this.state.result instanceof Array) ? <CoefficientsResults coefs = {this.state.result} /> : <SystemSolvingResult syses = {this.state.result}/>): ''}
      </>);
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
