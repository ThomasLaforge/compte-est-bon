import { Step } from "./Step";

export class Problem {
    public numbers: (Step | number)[]
    public expectedResult: number

    constructor(numbers: (Step | number)[], expectedResult: number){
        this.numbers = numbers
        this.expectedResult = expectedResult
    }
}