import React from "react";
import './Start.css'

export default class StartComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id='startComp'>
                <div id='description'>
                    <h1>Numeric Analysis</h1>
                    This site is devoted numerical methods in mathematics.
                    <br/>
                    It contains online-calculators and brief theory about numerical methods of solving non-linear equations,
                    <br/>
                    systems of linear equations and function interpolations.
                </div>
                <hr/>
                <div id='links'>
                    <a href='/equations' className='startLink'>Bisection method</a>
                    <a href='/equations' className='startLink'>Newton method</a>
                    <a href='/systems' className='startLink'>Gauss method</a>
                    <a href='/systems' className='startLink'>Tridiagonal matrix method</a>
                    <a href='/interpolation' className='startLink'>Lagrange method</a>
                    <a href='/interpolation' className='startLink'>Newton method</a>
                    <a href='/interpolation' className='startLink'>MMS method</a>
                    <a href='/interpolation' className='startLink'>Cubic Splains method</a>
                </div>
            </div>);
    }
}
