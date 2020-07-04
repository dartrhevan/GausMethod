import React from 'react';
import CalculatorComponent, {Img} from "../CalculatorComponent/CalculatorComponent";
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

class SystemsComponent extends CalculatorComponent {
  constructor(props) {
    super(props);
    const gausHdl = () => {
        const s = calc();
        this.setState({result: s});
    };
    const runHdl = () => {
          const s = runcalc();
          this.setState({result: s});
    };
    this.state = {
        types: [new Type('Gaus', SystemsComponent.getGaussDescription(), gausHdl.bind(this)), new Type('Tridiagonal matrix', SystemsComponent.getTridiagonalDescription(), runHdl.bind(this))],
        dimension: 2, current: 0, result: null, title: "Systems"
    };
  }

  changeDimension = () => {
    const dim = document.getElementById('dim');
      if(dim.value < 2)
      {
          dim.value = 2;
          return;
      }
      if(dim)
        this.setState({dimension: dim.value, result: null});
  };

  getCalculator = () => {
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
  };

  static getGaussDescription() {
      return (<>
          <h1>Method of Gauss</h1>
          Gaussian elimination, also known as row reduction, is an algorithm in linear algebra for solving a system of linear equations. It is usually understood as a sequence of operations performed on the corresponding matrix of coefficients. This method can also be used to find the rank of a matrix, to calculate the determinant of a matrix, and to calculate the inverse of an invertible square matrix. The method is named after Carl Friedrich Gauss (1777–1855).
          <br/>
          To perform row reduction on a matrix, one uses a sequence of elementary row operations to modify the matrix until the lower left-hand corner of the matrix is filled with zeros, as much as possible. There are three types of elementary row operations:
          <ul>
              <li>Swapping two rows,</li>
              <li>Multiplying a row by a nonzero number,</li>
              <li>Adding a multiple of one row to another row.</li>
          </ul>
          Using these operations, a matrix can always be transformed into an upper triangular matrix, and in fact one that is in row echelon form. Once all of the leading coefficients (the leftmost nonzero entry in each row) are 1, and every column containing a leading coefficient has zeros elsewhere, the matrix is said to be in reduced row echelon form. This final form is unique; in other words, it is independent of the sequence of row operations used. For example, in the following sequence of row operations (where multiple elementary operations might be done at each step), the third and fourth matrices are the ones in row echelon form, and the final matrix is the unique reduced row echelon form.
          <br/>
          <Img src='/img/Gauss/gaussExample1.png'/>
          <Img src='/img/Gauss/gaussExample2.png'/>
          <br/>
      </>)
  }

  static getTridiagonalDescription() {
      return (<>
          <h1>Tridiagonal matrix method</h1>
          In numerical linear algebra, the tridiagonal matrix algorithm, also known as the Thomas algorithm (named after Llewellyn Thomas), is a simplified form of Gaussian elimination that can be used to solve tridiagonal systems of equations. A tridiagonal system for n unknowns may be written as
          <br/>
          <Img src='/img/Tridiagonal/triadiagonalExample1.png' height='30'/>
          <br/>where a1=0, and cn=0.
          <br/>
          <Img src='/img/Tridiagonal/tridiagonalExample2.png' height='150'/>
          <br/>
          The forward sweep consists of modifying the coefficients as follows, denoting the new coefficients with primes:
          <br/>
          <Img src='/img/Tridiagonal/cs.png' height='125'/>
          <br/>
          and
          <br/>
          <Img src='/img/Tridiagonal/ds.png' height='125'/>
          <br/>
          The solution is then obtained by back substitution:
          <br/>
          <Img src='/img/Tridiagonal/sln.png'/>
          <br/>
      </>)
  }
}

export default SystemsComponent;
