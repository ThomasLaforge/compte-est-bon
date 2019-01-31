import { Solution } from "./Solution";
import { Problem } from "./Problem";
import { Step } from "./Step";
import { Operator } from "../defs";

export class Resolver {

    public pb: Problem

    constructor(pb: Problem){
        this.pb = pb
    }

    getSolutions(order = true) {
        let solutions: Solution[] = []
        const operators = [Operator.Add, Operator.Divide, Operator.Multiply, Operator.Substract]

        // console.log('length', this.pb.numbers.length)
        this.pb.numbers.forEach( (n1, i) => {
            this.pb.numbers.forEach( (n2, j) => {
                if(i !== j){
                    for (let k = 0; k < operators.length; k++) {
                        let operator = operators[k]
                        // let operator = Operator.Add
                        let step = new Step(n1, operator, n2)
                        const s = new Solution(step)
    
                        if(s.value === this.pb.expectedResult || j === this.pb.numbers.length - 1 || i === this.pb.numbers.length - 1){
                        // if(s.value === this.pb.expectedResult || j === this.pb.numbers.length - 1){
                            solutions.push(s)
                        }
                        else if(step.result > 0 && Math.floor(step.result) === step.result){
                            let numbers: (Step | number)[] = this.pb.numbers.filter( (v, index) => index !== i && index !== j)
                            numbers.push(step)
                            // console.log('numbers', numbers, this.pb.numbers)
                            let child = new Resolver(new Problem(numbers, this.pb.expectedResult))
                            solutions.push(...child.getSolutions())
                        }
                    }
                }
            })
        })

        return solutions
    }

    getSolution() {
        let bestSolutionValue = 0
        const operators = [Operator.Add, Operator.Divide, Operator.Multiply, Operator.Substract]

        
        // console.log('length', this.pb.numbers.length)
        this.pb.numbers.forEach( (n1, i) => {
            this.pb.numbers.forEach( (n2, j) => {
                if(i !== j){
                    for (let k = 0; k < operators.length; k++) {
                        let operator = operators[k]
                        // let operator = Operator.Add
                        let step = new Step(n1, operator, n2)
                        const s = new Solution(step)
    
                        if(s.value === this.pb.expectedResult){
                            return s 
                        }
                        else if(j === this.pb.numbers.length - 1 || i === this.pb.numbers.length - 1){
                            return s
                        }
                        // else if(step.result < 0 || Math.floor(step.result) !== step.result ){
                        //     solutions = []
                        // }
                        else {
                            let numbers: (Step | number)[] = this.pb.numbers.filter( (v, index) => index !== i && index !== j)
                            numbers.push(step)
                            // console.log('numbers', numbers, this.pb.numbers)
                            let child = new Resolver(new Problem(numbers, this.pb.expectedResult))
                            return child.getSolution()
                        }
                    }
                }
            })
        })

        return null
    }

    getBestSolutionValue(){
        const solutions = this.getSolutions()
        const expected = this.pb.expectedResult

        let i = 0
        let best = solutions[0]

        while(i < solutions.length && solutions[i].value !== expected){
            if(Math.abs(solutions[i].value - expected) < Math.abs(best.value - expected) ){
                best = solutions[i]
            }
            i++
        }

        console.log('got solutions', solutions.length, solutions[0].value, expected)

        return i === solutions.length ? best.value : solutions[i].value
    }

    isResolvable(){
        return this.getBestSolutionValue() === this.pb.expectedResult
    }


}