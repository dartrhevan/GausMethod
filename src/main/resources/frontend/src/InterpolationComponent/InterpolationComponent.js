import React from "react";
import CalculatorComponent from "../CalculatorComponent";
import Type from "../Type";
import $ from 'jquery';

export default class InterpolationComponent extends CalculatorComponent {
    constructor() {
        super();
        this.state = {
            types: [new Type('Lagrange', 'this.getDescription()', null), new Type('Newton', 'awfdgsfdg',null),
                new Type('MMS', 'awfdgsfdg',null), new Type('Splains', 'awfdgsfdg',null)],
            dimension: 2, current: 0, result: null, handler: 'Lagrange'
        };
        //InterpolationComponent.onFrameLoad();
    }

    static onFrameLoad() {
        const frame = document.getElementById('frame');
        const app = frame.contentWindow.document.getElementById('app');
        const res = frame.contentWindow.document.getElementById('res');
        $(res).css('word-wrap', 'break-word');
        app.onclick = InterpolationComponent.onFrameClick;
        /*
        frame.contentWindow.onresize = e =>
        {
            frame.style.height = app.style.height
        };*/
        frame.parentElement.style.padding = '5px';
    }

    static onFrameClick() {
        const frame = document.getElementById('frame');
        const app = frame.contentWindow.document.getElementById('app');
        frame.height = app.offsetHeight * 1.1;
        frame.width = app.offsetWidth;
        const details = frame.contentWindow.document.getElementsByTagName('details')[0];
        if(details)
            details.ontoggle = e => frame.height = app.offsetHeight * 1.1;
    }

    changeType(event) {
        const typeInd = this.state.types.map(t => t.title).indexOf(event.target.textContent);
        this.setState(this.getNewState({current: typeInd, handler: this.state.types[typeInd].title}))
    }

    getCalculator() {
        return <><iframe onLoad={InterpolationComponent.onFrameLoad} id='frame' src={`/interpolation.html?handler=${this.state.handler}`} seamless frameBorder='none' ></iframe><br/></>
    }
}
