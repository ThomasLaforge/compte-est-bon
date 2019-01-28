import { Step } from "../model/Step";
import { Operator } from "../defs";

describe('step', () => {
    describe('simple case', () => {
        test('add', () => {
            expect(new Step(4, Operator.Add, 3).result).toBe(7)
        });
        test('multiply', () => {
            expect(new Step(2, Operator.Multiply, 3).result).toBe(6)
        });
        test('divide', () => {
            expect(new Step(4, Operator.Divide, 2).result).toBe(2)
        });
        test('substract', () => {
            expect(new Step(6, Operator.Substract, 1).result).toBe(5)
        });
    })

    describe('intrication', () => {
        test('substract', () => {
            // 6 - (8 / 2) = 2
            expect(new Step(6, Operator.Substract, new Step(8, Operator.Divide, 2)).result).toBe(2)
        });
    })
})