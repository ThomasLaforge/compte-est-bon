import { Step } from "../model/Step";
import { Operator } from "../defs";

describe('step', () => {
    describe('simple case', () => {
        test('add', () => {
            expect(new Step(4,3, Operator.Add).result).toBe(7)
        });
        test('multiply', () => {
            expect(new Step(2,3, Operator.Multiply).result).toBe(6)
        });
        test('divide', () => {
            expect(new Step(4,2, Operator.Divide).result).toBe(2)
        });
        test('substract', () => {
            expect(new Step(6,1, Operator.Substract).result).toBe(5)
        });
    })

    describe('intrication', () => {
        test('substract', () => {
            // 6 - (8 / 2) = 2
            expect(new Step(6, new Step(8,2, Operator.Divide), Operator.Substract).result).toBe(2)
        });
    })
})