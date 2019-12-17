import React from 'react';
import CalculatorComponent from "../CalculatorComponent";
import {calcDivideByHalf, calcNewton} from "./DivideByHalf";
import Type from "../Type";

export default class GausAndRunComponent extends CalculatorComponent {
    constructor() {
        super();
        this.state = {
            types: [new Type('a', this.getDescription()), new Type('b', 'awfdgsfdg'),],
            dimension: 4, current: 0
        };
        this.getCalculator = this.getCalculator.bind(this);
    }
    getDescription() {
        return '';
    }
    getCalculator()
    {
        return (<div>
                Function:
                f(x)=
                <br/>
                <input type="text" className='inputRow' id="fun"/>
                <br/>
                Delta:
                <br/>
                <input type="text" className='inputRow' id="delta"/>
                <br/>
                Begin:
                <br/>
                <input type="text" className='inputRow' id="beg"/>
                <br/>
                End:
                <br/>
                <input type="text" className='inputRow' id="end"/>
                <br/>
                Result:<label id="res"></label>
                <br/>
                <button style={{float: 'left'}} onClick={calcDivideByHalf}>Div</button>
                <button style={{float: 'right'}} onClick={calcNewton}>Newton</button>
            </div>);
    }
}
