import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { ProblemBuilder } from './model/ProblemBuilder';
import { Problem as ProblemClass } from './model/Problem'
import { Resolver } from './model/Resolver';
import { Solution } from './model/Solution';
import { OPERATORS_LIST, Operator } from './defs';
import { getStringFromOperator } from './utils';
import Game from './components/Game';

interface AppProps {
}
interface AppState {
  problem: ProblemClass
  solution: Solution
  solutions: Solution[]
  leftNumber?: number
  rightNumber?: number
  operator?: Operator
}

class App extends Component<AppProps, AppState> {

  constructor(props: any){
    super(props)
    const p = ProblemBuilder.generate()
    // const p = new ProblemClass([5, 10, 10, 3, 2, 4], 417)
    // const p = new ProblemClass([5, 10, 3], 15)

    this.state = {
      problem: p,
      solution: new Resolver(p).getBestSolution(),
      solutions: new Resolver(p).getSolutions()
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
        <Game />
      </div>
    );
  }
}

export default App;
