import { Operator } from "./defs";

export function shuffle(input: any[]) {
    let array = input.slice()
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function getStringFromOperator(operator: Operator){
    switch (operator) {
        case Operator.Add: return '+'            
        case Operator.Divide: return '/'            
        case Operator.Substract: return '-'            
        case Operator.Multiply: return '*'            
    }
}