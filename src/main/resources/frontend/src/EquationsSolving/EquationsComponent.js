import React from 'react';
import CalculatorComponent from "../CalculatorComponent/CalculatorComponent";
import {calcDivideByHalf, calcNewton} from "./DivideByHalf";
import Type from "../CalculatorComponent/Type";

export default class GausAndRunComponent extends CalculatorComponent {
    constructor() {
        super();
        this.state = {
            types: [new Type('DivideByHalf', this.getDescription(), calcDivideByHalf), new Type('Newton', 'awfdgsfdg', calcNewton),],
            dimension: 4, current: 0
        };
        this.getCalculator = this.getCalculator.bind(this);
    }
    getDescription() {
        return '';
    }
    getCalculator()
    {
        return (<>
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
            </>);
    }
}
