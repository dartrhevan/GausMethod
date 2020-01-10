import React from "react";
import CalculatorComponent from "./CalculatorComponent/CalculatorComponent";
import Type from "./CalculatorComponent/Type";
import $ from 'jquery';

export default class InterpolationComponent extends CalculatorComponent {
    constructor(props) {
        super(props);
        this.state = {
            types: [new Type('Lagrange', InterpolationComponent.getLagrangeDescription(), null), new Type('Newton', InterpolationComponent.getNetonDescription(),null),
                new Type('MMS', 'awfdgsfdg',null), new Type('Splains', 'awfdgsfdg',null)],
            dimension: 2, current: 0, result: null, handler: 'Lagrange', title: "Interpolation"
        };
        //InterpolationComponent.onFrameLoad();
    }

    static getLagrangeDescription() {
        return (<>
            The Lagrange form of the interpolating polynomial is a linear combination of the given values. In many scenarios, an efficient and convenient polynomial interpolation is a linear combination of the given values, using previously known coefficients. Given a set of k+1 data points (x0,y0),...,(xj,yj), ... ,(xk,yk) where each data point is a (position, value) pair and where no two positions xj are the same, the interpolation polynomial in the Lagrange form is a linear combination
            <br/>
            <img src='/img/lagrangeFormula1.png'/>
            <br/>
            of the given values yj with each coefficient cj(x) given by evaluating the corresponding Lagrange basis polynomial using the given k+1 positions xj.
            <br/>
            <img src='/img/lagrangeFormula2.png'/>
            <img src='/img/lagrangeFormula3.png'/>
            <br/>
        </>)
    }

    static getNetonDescription() {
        return (<>
            The polynomials of Newton’s basis,ek, are defined by:
            ek(x) = (x - x0)(x - x1) ... (x - xk-1), k = 1, ... n.
            with the following convention: e0 = 1.
            The set of polynomials(ek)0≤k≤n (Newton’s basis) are a basis of Pn, the space of polynomials of degree at most equal to n. Indeed, they constitute an echelon-degree set of (n + 1 ) polynomials.
            Newton’s interpolation polynomial of degree
            n
            related to the subdivision
            &#123;
                (x0,
                y
                0
                )
                ,
                (
                x
                1
                ,
                y
                1
                )
                ,
                ...
                ,
                (
                x
                n
                ,
                y
                n
                )
            &#125;
            is:
            <br/>
            <img src='/img/newtonInt1.png'/>
            <br/>
            where
            <br/>
            <img src='/img/newtonInt2.png'/>
            <br/>
            We shall see how to determine the coefficients
            (
            α
            k
            )
            0
            ≤
            k
            ≤
            n
            in the following section entitled the divided differences.
            <h3>Divided differences</h3>
            Newton’s interpolation polynomial of degree
            n
            ,
            P
            n
            (
            x
            )
            , evaluated at
            x
            0
            , gives:

            <br/>
            <img src='/img/newtonInt3.png'/>
            <br/>
            Generally speaking, we write:
            <img src='/img/newtonInt4.png'/>
            <br/>
            f
            [
            x
            0
            ]
            is called a zero-order divided difference.By recurrence, we obtain:
            <br/>
            <img src='/img/newtonInt5.png'/>
            <br/>
            <h3>Newton’s interpolation polynomial of degree n</h3>
            Newton’s interpolation polynomial of degree
            n
            is obtained via the successive divided differences:
            <br/>
            <img src='/img/newtonInt6.png'/>
            <br/>
        </>);
    }

    static onFrameLoad() {
        const frame = document.getElementById('frame');
        const app = frame.contentWindow.document.getElementById('app');
        const res = frame.contentWindow.document.getElementById('res');
        $(res).css('word-wrap', 'break-word');
        app.onclick = InterpolationComponent.onFrameClick;
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
