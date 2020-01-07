import React from 'react';
import '../../index.css';
import CommentsComponent from "../CommentsComponent/CommentsComponent";

export default class CalculatorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {types: [], dimension: 0, current: 0, result: null, title: ""};
        this.getCalculator = this.getCalculator.bind(this);
        this.changeType = this.changeType.bind(this);
        console.log(props.isLogged);
    }

    changeType(event) {
        const typeInd = this.state.types.map(t => t.title).indexOf(event.target.textContent);
        this.setState(this.getNewState({current: typeInd}))
    }

    getCalculator() {}

    getNewState(obj) {
        return Object.assign({}, this.state, obj);
    }

    render() {
        return(
            <div id='calculator'>
            <div className='content'>
                <div className='switcher'>
                    {this.state.types.map((t, ind) =>
                        <div onClick={this.changeType} className={`type ${ind === this.state.current ? 'active-type':''}`}>{t.title}</div>)}
                </div>
                {this.state.types[this.state.current].description }
                <hr/>
                <div align='center' className='calculator'>
                    {this.getCalculator()}
                    {this.state.handler ? '' : (
                        <>
                            <button onClick={this.state.types[this.state.current].handler} style={{minWidth: 100 + 'px'}}>Calculate</button><br/>
                            Result:<div id="res"></div>
                            <br/>
                        </>)
                    }
                </div>
            </div>
            <CommentsComponent title={this.state.title} isLogged={this.props.isLogged}/>
            </div>);
    }
}
