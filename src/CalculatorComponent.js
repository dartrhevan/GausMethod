import React from 'react';
import './index.css';

export default class CalculatorComponent extends React.Component {
    constructor() {
        super();
        this.state = {types: [], dimension: 0, current: 0};
        this.getCalculator = this.getCalculator.bind(this);
    }

    getCalculator() {}

    render() {
        return(
            <div className='content'>
                <div className='switcher'>
                    {this.state.types.map(t => <div className='type'>{t.title}</div>)}
                </div>
                {this.state.types[this.state.current].description }
                <hr/>
                <div align='center' className='calculator'>
                    {this.getCalculator()}
                </div>
            </div>);
    }
}
