import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Problem from './components/Problem';
import { ProblemBuilder } from './model/ProblemBuilder';
import { Problem as ProblemClass } from './model/Problem'
import { Resolver } from './model/Resolver';
import { Solution } from './model/Solution';
import { OPERATORS_LIST, Operator } from './defs';
import { getStringFromOperator } from './utils';

interface AppProps {
}
interface AppState {
  problem: ProblemClass
  solution: Solution
  leftNumber?: number
  rightNumber?: number
  operator?: Operator
}

class App extends Component<AppProps, AppState> {

  constructor(props: any){
    super(props)
    const p = ProblemBuilder.generate()
    this.state = {
      problem: p,
      solution: new Resolver(p).getBestSolution()
    }
  }

  handleClickOnNumber = (n: number) => {
    // if(this.state.leftNumber)
    this.setState({})
  }

  render() {
    console.log('solution', this.state.solution, this.state.solution.toString(), this.state.solution.toStringArray())
    return (
      <div className="App">
        <Problem object={this.state.problem} />
        <div className="solution">
      	  {this.state.solution.toStringArray().map( (line, i) => (
            <div className="solution-line" key={i}>{line}</div>
          ))}
        </div>
        <div className="player-zone">
            <h2>Player</h2>
            <div className="player-board">
            
            </div>
            <div className="player-input">
              <div className="player-input-number">
                {this.state.problem.numbers.map( (n, i) => (
                  <div className="player-numbers-elt" key={i}>
                    <button onClick={() => this.handleClickOnNumber(n as number)}>{n}</button>
                  </div>
                ))}
              </div>
              <div className="player-input-operators">
                {OPERATORS_LIST.map( (o, i) => (
                  <div className="player-operator-elt" key={i}>
                    <button>{getStringFromOperator(o)}</button>
                  </div>
                ))}
              </div>
              <div className="player-input-actions">
                <button>{'<--'}</button>
                <button>=</button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
