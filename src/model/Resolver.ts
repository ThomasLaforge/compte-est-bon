import { Solution } from "./Solution";

export class Resolver {

    public numbers: number[]
    public expectedResult: number

    constructor(numbers: number[], expectedResult: number){
        this.numbers = numbers
        this.expectedResult = expectedResult
    }

    getSolutions(order = true) {
        let solutions: Solution[] = []

        return solutions
    }

    getBestSolutionValue(){
        return this.getSolutions()[0].value
    }

    isResolvable(){
        return this.getBestSolutionValue() === this.expectedResult
    }


}