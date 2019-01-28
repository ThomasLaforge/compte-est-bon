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

        const step: Step = this.pb.numbers.reduce( (s: Step, n) => new Step(s, n, Operator.Add), 0 as any)
        const s = new Solution(step)
        console.log('sum', s.value)
        solutions.push(s)

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