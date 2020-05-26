import React from "react";
import CalculatorComponent, {Img} from "./CalculatorComponent/CalculatorComponent";
import Type from "./CalculatorComponent/Type";
import $ from 'jquery';

export default class InterpolationComponent extends CalculatorComponent {
    constructor(props) {
        super(props);
        this.state = {
            types: [new Type('Lagrange', InterpolationComponent.getLagrangeDescription(), null), new Type('Newton', InterpolationComponent.getNewtonDescription(),null),
                new Type('MMS', InterpolationComponent.getMMSDescription(),null), new Type('Splains', InterpolationComponent.getSplainDescription(),null)],
            dimension: 2, current: 0, result: null, handler: 'Lagrange', title: "Interpolation"
        };
        //InterpolationComponent.onFrameLoad();
    }

    static onFrameLoad() {
        const frame = document.getElementById('frame');
        const app = frame.contentWindow.document.getElementById('app');
        const res = frame.contentWindow.document.getElementById('res');
        $(res).css('word-wrap', 'break-word');
        app.onclick = InterpolationComponent.onFrameClick;
        frame.parentElement.style.padding = '5px';
        InterpolationComponent.onFrameClick();
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
        this.setState({current: typeInd, handler: this.state.types[typeInd].title})
    }

    getCalculator() {
        return <><iframe title='intepolation' onLoad={InterpolationComponent.onFrameLoad} id='frame' src={`/interpolation.html?handler=${this.state.handler}`} seamless frameBorder='none' ></iframe><br/></>
    }

    static getLagrangeDescription() {
        return (<>
            <h1>Lagrange polynomial interpolation</h1>
            The Lagrange form of the interpolating polynomial is a linear combination of the given values. In many scenarios, an efficient and convenient polynomial interpolation is a linear combination of the given values, using previously known coefficients. Given a set of k+1 data points (x0,y0),...,(xj,yj), ... ,(xk,yk) where each data point is a (position, value) pair and where no two positions xj are the same, the interpolation polynomial in the Lagrange form is a linear combination
            <br/>
            <Img src='/img/Lagrange/lagrangeFormula1.png'/>
            <br/>
            of the given values yj with each coefficient cj(x) given by evaluating the corresponding Lagrange basis polynomial using the given k+1 positions xj.
            <br/>
            <Img src='/img/Lagrange/lagrangeFormula2.png'/>
            <Img src='/img/Lagrange/lagrangeFormula3.png'/>
            <br/>
        </>)
    }

    static getSplainDescription() {
        return (<>
            <h1>Cubic splain interpolation</h1>
            In the mathematical field of numerical analysis, spline interpolation is a form of interpolation where the interpolant is a special type of piecewise polynomial called a spline. Spline interpolation is often preferred over polynomial interpolation because the interpolation error can be made small even when using low degree polynomials for the spline.
            <br/>
            Cubic spline interpolation is a special case for Spline interpolation that is used very often to avoid the problem of Runge's phenomenon. This method gives an interpolating polynomial that is smoother and has smaller error than some other interpolating polynomials such as Lagrange polynomial and Newton polynomial.
            <br/>
            The resulting functions will be in the following form:
            <Img height='35' src='/img/Splains/solution.png'/>
            Coefficients a, b, d are defined as follow:
            <br/>
            <Img height='150' src='/img/Splains/coefs.png'/>
            , where
            <Img height='40' src='/img/Splains/h.png'/>
            To calculate c coefficients the following linear system should be solved:
            <Img height='70' src='/img/Splains/c.png'/>
            <a href='/systems'>Tridiagonal matrix method</a> is usually used to this purpose.
        </>)
    }

    static getMMSDescription() {
        return (<>
            <h1>Linear approximation: method of minimum squares</h1>
            The method of least squares is a standard approach in regression analysis to approximate the solution of overdetermined systems (sets of equations in which there are more equations than unknowns) by minimizing the sum of the squares of the residuals made in the results of every single equation.
            <h3>Steps</h3>
            To find the line of best fit for N points:
            <ol>
                <li>For each (x,y) point calculate x^2 and xy</li>
                <li> Sum all x, y, x2 and xy, which gives us Σx, Σy, Σx2 and Σxy (Σ means "sum up")</li>
                <li>Calculate Slope m: <Img src='/img/Aprox/m.png'/></li>
                <li>Calculate Intercept b: <Img src='/img/Aprox/b.png'/></li>
                <li>Assemble the equation of a line: <b>y = mx + b</b></li>
            </ol>
        </>);
    }

    static getNewtonDescription() {
        return (<>
            <h1>Newton polynomial interpolation</h1>
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
            <Img src='/img/NewtonInt/newtonInt1.png'/>
            where
            <br/>
            <Img height='60' src='/img/NewtonInt/newtonInt2.png'/>
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
            <Img src='/img/NewtonInt/newtonInt3.png'/>
            Generally speaking, we write:
            <Img height='50' src='/img/NewtonInt/newtonInt4.png'/>
            <br/>
            f
            [
            x
            0
            ]
            is called a zero-order divided difference.By recurrence, we obtain:
            <br/>
            <Img src='/img/NewtonInt/newtonInt5.png'/>
            <br/>
            <h3>Newton’s interpolation polynomial of degree n</h3>
            Newton’s interpolation polynomial of degree
            n
            is obtained via the successive divided differences:
            <br/>
            <Img src='/img/NewtonInt/newtonInt6.png'/>
            <br/>
        </>);
    }

}
