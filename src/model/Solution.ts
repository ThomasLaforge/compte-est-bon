import { Step } from "./Step";

export class Solution {

    public step: Step

    constructor(step: Step){
        this.step = step
    }

    get value(){
        return this.step.result
    }

}