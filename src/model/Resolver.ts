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

        this.pb.numbers.forEach( (n, i) => {
            for (let j = 0; j < this.pb.numbers.length; j++) {
                if(i !== j){
                    for (let k = 0; k < operators.length; k++) {
                        let operator = operators[k]
                        let step = new Step(n, operator, this.pb.numbers[j])
                        const s = new Solution(step)
    
                        if(s.value === this.pb.expectedResult || j === this.pb.numbers.length - 1){
                            solutions.push(s)
                        }
                        else {
                            let numbers: (Step | number)[] = this.pb.numbers.filter( (v, index) => index !== i && index !== j)
                            numbers.push(step)
                            let child = new Resolver(new Problem(numbers, this.pb.expectedResult))
                            solutions.push(...child.getSolutions())
                        }
                    }
                }
            }

        })

        return solutions
    }

    getSolution(numbers: (number | Step)[]){
        
    }

    getBestSolutionValue(){
        return this.getSolutions()[0].value
    }

    isResolvable(){
        return this.getBestSolutionValue() === this.pb.expectedResult
    }


}