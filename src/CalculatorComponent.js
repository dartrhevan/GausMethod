import React from 'react';
import './index.css';

export default class CalculatorComponent extends React.Component {
    constructor() {
        super();
        this.state = {types: [], dimension: 0, current: 0};
        this.getCalculator = this.getCalculator.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    changeType(event) {
        const typeInd = this.state.types.map(t => t.title).indexOf(event.target.textContent);
        this.setState({types: this.state.types, dimension: this.state.dimension, current: typeInd})
        //console.log(event);
    }

    getCalculator() {}

    render() {
        return(
            <div className='content'>
                <div className='switcher'>
                    {this.state.types.map((t, ind) => <div onClick={this.changeType} className={`type ${ind === this.state.current ? 'active-type':''}`}>{t.title}</div>)}
                </div>
                {this.state.types[this.state.current].description }
                <hr/>
                <div align='center' className='calculator'>
                    {this.getCalculator()}
                </div>
                <button onClick={this.state.types[this.state.current].handler}>Calc</button>
                Result:<label id="res"></label>
            </div>);
    }
}
