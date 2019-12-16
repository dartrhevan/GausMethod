import React from 'react';
import {calcDivideByHalf, calcNewton} from "./DivideByHalf";

export default class GausAndRunComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className='calculator'>
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
