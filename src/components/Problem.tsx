import React, { Component } from 'react'
import {Problem as ProblemClass} from '../model/Problem'

interface ProblemProps {
    object: ProblemClass
}
interface ProblemState {
}

export class Problem extends Component<ProblemProps, ProblemState> {

    constructor(props: ProblemProps) {
        super(props)
        this.state = {
        }  
    }

    renderNumbers(){
        return this.props.object.numbers.map( (n, i) => (
            <div className="problem-numbers-elt" key={i}>
                <div className="problem-numbers-value">
                    {n}
                </div>
            </div>
        ))
    }

    render() {
        return (
        <div className='problem'>
            <div className="problem-numbers">
                {this.renderNumbers()}
            </div>
            <div className="problem-expect">
                <div className="problem-expected-value">
                    {this.props.object.expectedResult}
                </div>
            </div>
        </div>
        )
    }
}

export default Problem