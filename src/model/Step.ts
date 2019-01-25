import { Operator } from "../defs";

export class Step {

    public leftNumber: number | Step
    public rightNumber: number | Step
    public operator: Operator

    constructor(leftNumber: number | Step, rightNumber: number | Step, operator: Operator){
        this.leftNumber = leftNumber
        this.rightNumber = rightNumber
        this.operator = operator
    }

    get result(): number {
        const leftValue = this.leftNumber instanceof Step ? this.leftNumber.result : this.leftNumber 
        const rightValue = this.rightNumber instanceof Step ? this.rightNumber.result : this.rightNumber 

        switch (this.operator) {
            case Operator.Add:
                return leftValue + rightValue
            case Operator.Substract:
                return leftValue - rightValue
            case Operator.Multiply:
                return leftValue * rightValue
            case Operator.Divide:
                return leftValue / rightValue
        }
    }

    isLegal(){
        const isPositive = this.result > 0
        const isInteger = this.result === Math.round(this.result)
        return isPositive && isInteger
    }

}