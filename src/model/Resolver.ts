import { Solution } from "./Solution";
import { Problem } from "./Problem";
import { Step } from "./Step";
import { Operator, OPERATORS_LIST } from "../defs";

export class Resolver {

    public pb: Problem
    public bestSolution?: Solution

    constructor(pb: Problem){
        this.pb = pb
    }

    getSolutions(order = true) {
        let solutions: Solution[] = []

        // console.log('length', this.pb.numbers.length)
        this.pb.numbers.forEach( (n1, i) => {
            this.pb.numbers.forEach( (n2, j) => {
                // http://olivierpisano.over-blog.com/article-le-compte-est-bon-60536169.html
                if(n1 >= n2 && i !== j){
                    OPERATORS_LIST.forEach( operator => {                    
                        let step = new Step(n1, operator, n2)
                        const s = new Solution(step)
    
                        if(s.value === this.pb.expectedResult || j === this.pb.numbers.length - 1 || i === this.pb.numbers.length - 1){
                            solutions.push(s)
                        }
                        else if(step.result > 0 && Number.isInteger(step.result) ){
                            let numbers: (Step | number)[] = this.pb.numbers.filter( (v, index) => index !== i && index !== j)
                            numbers.push(step)
                            // console.log('numbers', numbers, this.pb.numbers)
                            let child = new Resolver(new Problem(numbers, this.pb.expectedResult))
                            solutions.push(...child.getSolutions())
                        }
                    })
                }
            })
        })

        return solutions
    }

    getSolution() {
        // let bestSolutionValue = 0
        const operators = [Operator.Add, Operator.Divide, Operator.Multiply, Operator.Substract]

        
        // console.log('length', this.pb.numbers.length)
        this.pb.numbers.forEach( (n1, i) => {
            this.pb.numbers.forEach( (n2, j) => {
                if(i !== j){
                    operators.forEach( operator => {
                        // let operator = Operator.Add
                        let step = new Step(n1, operator, n2)
                        const s = new Solution(step)
    
                        if(s.value === this.pb.expectedResult){
                            return s
                        }
                        else if(step.result > 0 && Math.floor(step.result) === step.result){
                            let numbers: (Step | number)[] = this.pb.numbers.filter( (v, index) => index !== i && index !== j)
                            numbers.push(step)
                            // console.log('numbers', numbers, this.pb.numbers)
                            let child = new Resolver(new Problem(numbers, this.pb.expectedResult))
                            return child.getSolution()
                        }
                    })
                }
            })
        })

        return false
    }

    getBestSolutionValue(){
        return this.getBestSolution().value
    }

    getBestSolution(){
        if(this.bestSolution){
            return this.bestSolution
        }

        const solutions = this.getSolutions()
        console.log(solutions.map(s => s.value))
        const expected = this.pb.expectedResult

        let i = 0
        let best = solutions[0]
        let diffWithBest = Math.abs(best.value - expected)

        while(i < solutions.length && solutions[i].value !== expected){
            if(Math.abs(solutions[i].value - expected) < diffWithBest){
                best = solutions[i]
                diffWithBest = Math.abs(best.value - expected)
            }
            i++
        }

        this.bestSolution = i === solutions.length ? best : solutions[i]
        return this.bestSolution
    }

    isResolvable(){
        return this.getBestSolutionValue() === this.pb.expectedResult
    }


}