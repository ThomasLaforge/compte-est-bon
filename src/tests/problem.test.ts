import { ProblemBuilder } from "../model/ProblemBuilder";
import { Problem } from "../model/Problem";
import { Resolver } from "../model/Resolver";

describe('problem', () => {
    describe('problem builder', () => {
        test('create', () => {
            const p = ProblemBuilder.generate()
            expect(!!p).toBe(true)
        });
    })
    
    describe('problem solver', () => {
        test('full add', () => {
            const p = new Problem([1, 10, 100, 25, 3, 2, 9], 150)
            const r = new Resolver(p)
            expect(r.isResolvable()).toBe(true)
        });
    })
})