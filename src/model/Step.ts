import { Operator } from "../defs";
import { getStringFromOperator } from "../utils";
import { instanceOf } from "prop-types";
import { resolve } from "q";

export class Step {

    public leftNumber: number | Step
    public rightNumber: number | Step
    public operator: Operator
    public cachedResult!: number

    constructor(leftNumber: number | Step, operator: Operator, rightNumber: number | Step){
        this.leftNumber = leftNumber
        this.rightNumber = rightNumber
        this.operator = operator
    }

    get result(): number {
        if(!this.cachedResult){   
            const leftValue = this.leftNumber instanceof Step ? this.leftNumber.result : this.leftNumber 
            const rightValue = this.rightNumber instanceof Step ? this.rightNumber.result : this.rightNumber 

            switch (this.operator) {
                case Operator.Add:
                    this.cachedResult = leftValue + rightValue
                    break
                case Operator.Substract:
                    this.cachedResult = leftValue - rightValue
                    break
                case Operator.Multiply:
                    this.cachedResult = leftValue * rightValue
                    break
                case Operator.Divide:
                    this.cachedResult = leftValue / rightValue
                    break
            }
        }

        return this.cachedResult
    }

    isLegal(){
        const isPositive = this.result > 0
        const isInteger = this.result === Math.round(this.result)
        return isPositive && isInteger
    }

    toString(){
        let res = ''

        // Recursive left and right steps
        if(this.leftNumber instanceof Step){
            res += this.leftNumber.toString()
        }
        if(this.rightNumber instanceof Step){
            res += this.rightNumber.toString()
        }

        // render one step
        res += (this.leftNumber instanceof Step ? this.leftNumber.result.toString() : this.leftNumber.toString())
        res += (' '  + getStringFromOperator(this.operator))
        res += ' ' + (this.rightNumber instanceof Step ? this.rightNumber.result.toString() : this.rightNumber.toString())
        res += ' = ' + this.result.toString()
        res += "\n"

        return res
    }

    toStringArray(){
        let result: string[] = []

        // Recursive left and right steps
        if(this.leftNumber instanceof Step){
            result.push(...this.leftNumber.toStringArray())
        }
        if(this.rightNumber instanceof Step){
            result.push(...this.rightNumber.toStringArray())
        }

        // render one step
        let res = ''
        res += (this.leftNumber instanceof Step ? this.leftNumber.result.toString() : this.leftNumber.toString())
        res += (' '  + getStringFromOperator(this.operator))
        res += ' ' + (this.rightNumber instanceof Step ? this.rightNumber.result.toString() : this.rightNumber.toString())
        res += ' = ' + this.result.toString()

        result.push(res)

        return result
    }

}