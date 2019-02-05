import React, { Component } from 'react'
import { Problem } from '../model/Problem';
import { ProblemBuilder } from '../model/ProblemBuilder';
import { Solution } from '../model/Solution';
import { Step } from '../model/Step';
import { OPERATORS_LIST } from '../defs';
import { getStringFromOperator } from '../utils'

interface GameProps {

}

interface GameState {
    problem: Problem
    solution?: Solution
    renderSolution: boolean
}

export default class Game extends Component<GameProps, GameState> {
    constructor(props: GameProps){
        super(props)
        this.state = {
            problem: ProblemBuilder.generate(),
            renderSolution: false
        }
    }


    handleNumberClick(number: number, index: number){
        console.log('click on number', number, index)
    }
    renderNumbers(){
        return this.state.problem.numbers.map( (n, i) => (
            <div 
                className="numbers-elt" key={i}
                onClick={() => this.handleNumberClick(n instanceof Step ? n.result : n, i)}
            >{n}</div>
        ))
    }

    renderSteps(){
        return <div className="steps-elt">nothing for the moment ...</div>
    }

    renderOperators(){
        return OPERATORS_LIST.map( (op, i) => (
            <div className="operators-elt">{getStringFromOperator(op)}</div>
        ))
    }

    render() {
        return (
            <div className='game'>
                <div className="game-content">
                    <div className="info-zone">
                        <div className="objectif">
                            {this.state.problem.expectedResult}
                        </div>
                        <div className="go-to-home-btn">Menu</div>
                        <div className="new-game-btn">Nouvelle Partie</div>
                        <div className="restart-btn">Recommencer</div>
                        <div className="timer">90</div>
                    </div>
                    <div className="board">
                        <div className="left-part">
                            <div className="numbers">
                                {this.renderNumbers()}
                            </div>
                            <div className="steps">
                                {this.renderSteps()}
                            </div>
                            <div className="actions">
                                <div className="delete-btn">Effacer</div>
                                <div className="validate-btn">Valider</div>
                            </div>
                        </div>
                        <div className="rigth-part">
                            {this.renderOperators()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
