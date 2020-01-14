import React from 'react';
import CalculatorComponent, {Img} from "../CalculatorComponent/CalculatorComponent";
import {calcDivideByHalf, calcNewton} from "./DivideByHalf";
import Type from "../CalculatorComponent/Type";

export default class EquationsComponent extends CalculatorComponent {
    constructor(props) {
        super(props);
        this.state = {
            types: [new Type('Bisection', EquationsComponent.getBisectionDescription(), calcDivideByHalf), new Type('Newton', EquationsComponent.getNewtonDescription(), calcNewton),],
            dimension: 4, current: 0, title: "Equations"
        };
        this.getCalculator = this.getCalculator.bind(this);
    }
    static getBisectionDescription() {
        return (
            <>
                This is one of the simplest methods and is strongly based on the property of intervals. To find a root using this method, the first thing to do is to find an interval [a,b] such that f(a)&middot;f(b) &lt; 0. Bisect this interval to get a point (c,f(c)). Choose one of a or b so that the sign of f(c) is opposite to the ordinate at that point. Use this as the new interval and proceed until you get the root within desired accuracy.
                <br/>
                Example
                Solve  e^x-2x^2+3x+1=0 correct up to 2 decimal places.
                <br/>
                <Img  height='150' src='/img/bisectionExample.png'/>
            </>);
    }

    static getNewtonDescription() {
        return (
            <>
                In numerical analysis, Newton's method (also known as the Newton–Raphson method or the Newton–Fourier method) is an efficient algorithm for finding approximations to the zeros (or roots) of a real-valued function. As such, it is an example of a root-finding algorithm.

                Any zero-finding method (Bisection Method, False Position Method, Newton-Raphson, etc.) can also be used to find a minimum or maximum of such a function, by finding a zero in the function's first derivative, see Newton's method as an optimization algorithm.

                <h2>Description of the method</h2>
                The idea of the Newton-Raphson method is as follows: one starts with an initial guess which is reasonably close to the true root, then the function is approximated by its tangent line (which can be computed using the tools of calculus), and one computes the x-intercept of this tangent line (which is easily done with elementary algebra). This x-intercept will typically be a better approximation to the function's root than the original guess, and the method can be iterated. Suppose f : [a, b] → R is a differentiable function defined on the interval [a, b] with values in the real numbers R. The formula for converging on the root can be easily derived. Suppose we have some current approximation xn. Then we can derive the formula for a better approximation, xn+1 by referring to the diagram on the right. We know from the definition of the derivative at a given point that it is the slope of a tangent at that point.

                We can get better convergence if we know about the function's derivatives. Consider the tangent to the function:
                Near any point, the tangent at that point is approximately the same as f('x) itself, so we can use the tangent to approximate the function.

                The tangent through the point (xn, f(xn)) is
                <br/>
                <Img height='45' src='/img/Newton/newtonFormula1.png'/>
                <br/>

                The next approximation, xn+1, is where the tangent line intersects the axis, so where y=0. Rearranging, we find

                <br/>
                <Img height='60' src='/img/Newton/newtonFormula2.png'/>
                <br/>
            </>);
    }
    getCalculator()
    {
        return (
            <>
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
