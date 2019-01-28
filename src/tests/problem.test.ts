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

        test('get all solutions with two numbers', () => {
            const p = new Problem([1, 10], 10)
            const r = new Resolver(p)
            // expect(r.getSolutions().map(s => s.value)).toBe([11, 10])
            expect(r.getSolutions().length).toBe(6)
        })
    })
})