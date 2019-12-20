import React from "react";
import CalculatorComponent from "../CalculatorComponent";
import Type from "../Type";

export default class InterpolationComponent extends CalculatorComponent {
    constructor() {
        super();
        this.state = {
            types: [new Type('a', 'this.getDescription()', null), new Type('b', 'awfdgsfdg',null)],
            dimension: 2, current: 0, result: null
        };
        //InterpolationComponent.onFrameLoad();
    }

    static onFrameLoad() {
        const frame = document.getElementById('frame');
        const app = frame.contentWindow.document.getElementById('app');
        app.onclick = InterpolationComponent.onFrameClick;
        frame.contentWindow.onresize = e =>
        {
            frame.style.height = app.style.height
        };
    }

    static onFrameClick() {
        const frame = document.getElementById('frame');
        const app = frame.contentWindow.document.getElementById('app');
        frame.height = app.offsetHeight + 20;
        const details = frame.contentWindow.document.getElementsByTagName('details')[0];
        if(details)
        details.ontoggle = e => frame.height = app.offsetHeight + 20;
    }

    getCalculator() {
        return <><iframe onLoad={InterpolationComponent.onFrameLoad}  id='frame' src='/interpolation/interpolation.html' seamless frameBorder='none' ></iframe><br/></>
    }
}
