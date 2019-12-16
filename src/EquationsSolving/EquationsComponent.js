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
                <br/>
                f(x)=
                <br/>
                <input type="text" id="fun"/>
                <br/>
                Delta:
                <br/>
                <input type="text" id="delta"/>
                <br/>
                Begin:
                <br/>
                <input type="text" id="beg"/>
                <br/>
                End:
                <br/>
                <input type="text" id="end"/>
                <br/>
                Result:<label id="res"></label>
                <button onClick={calcDivideByHalf}>Div</button>
                <button onClick={calcNewton}>Newton</button>
            </div>);
    }
}
