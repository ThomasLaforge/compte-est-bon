import { Solution } from "./Solution";
import { Problem } from "./Problem";
import { Step } from "./Step";
import { Operator, OPERATORS_LIST, MIN_SOLUTION, MAX_SOLUTION } from "../defs";

export class Resolver {

    public pb: Problem

    constructor(pb: Problem){
        this.pb = pb
    }

    getSolutions(order = true) {
        let solutions: Solution[] = []

        if(this.pb.numbers.length > 1){
            this.pb.numbers.forEach( (n1, i) => {
                this.pb.numbers.forEach( (n2, j) => {
                    const n1Value = n1 instanceof Step ? n1.result : n1
                    const n2Value = n2 instanceof Step ? n2.result : n2
                    
                    // http://olivierpisano.over-blog.com/article-le-compte-est-bon-60536169.html
                    if(n1Value >= n2Value && i !== j){
                        OPERATORS_LIST.forEach( operator => {                    
                            const step = new Step(n1, operator, n2)
                            const s = new Solution(step)
    
                            if(this.pb.numbers.length > 2 && step.result > 0 && Number.isInteger(step.result)){
                                let numbers: (Step | number)[] = this.pb.numbers.filter( (v, index) => index !== i && index !== j)
                                numbers.push(step)
                                let child = new Resolver(new Problem(numbers, this.pb.expectedResult))
                                solutions.push(...child.getSolutions())
                            }
                            else if(s.value >= MIN_SOLUTION && s.value <= MAX_SOLUTION){
                                solutions.push(s)
                            }
                        })
                    }
                })
            })
        }

        return solutions
    }

    // getSolution() {
    //     let solution: Solution

    //     if(this.pb.numbers.length > 1){
    //         this.pb.numbers.forEach( (n1, i) => {
    //             this.pb.numbers.forEach( (n2, j) => {
    //                 const n1Value = n1 instanceof Step ? n1.result : n1
    //                 const n2Value = n2 instanceof Step ? n2.result : n2
                    
    //                 // http://olivierpisano.over-blog.com/article-le-compte-est-bon-60536169.html
    //                 if(n1Value >= n2Value && i !== j){
    //                     OPERATORS_LIST.forEach( operator => {                    
    //                         const step = new Step(n1, operator, n2)
    //                         const s = new Solution(step)
    
    //                         if(this.pb.numbers.length > 2 && step.result > 0 && Number.isInteger(step.result)){
    //                             let numbers: (Step | number)[] = this.pb.numbers.filter( (v, index) => index !== i && index !== j)
    //                             numbers.push(step)
    //                             let child = new Resolver(new Problem(numbers, this.pb.expectedResult))
    //                             solutions.push(...child.getSolutions())
    //                         }
    //                         else if(s.value >= MIN_SOLUTION && s.value <= MAX_SOLUTION){
    //                             solutions.push(s)
    //                         }
    //                     })
    //                 }
    //             })
    //         })
    //     }

    //     return solution
    // }

    getBestSolutionValue(){
        return this.getBestSolution().value
    }

    getBestSolution(){
        const solutions = this.getSolutions()
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

        return i === solutions.length ? best : solutions[i]
    }

    isResolvable(){
        return this.getBestSolutionValue() === this.pb.expectedResult
    }


}