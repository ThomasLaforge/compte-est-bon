import { ProblemBuilder } from "../model/ProblemBuilder";
import { Problem } from "../model/Problem";
import { Resolver } from "../model/Resolver";

describe('problem', () => {
    // describe('problem builder', () => {
    //     test('create', () => {
    //         const p = ProblemBuilder.generate()
    //         expect(!!p).toBe(true)
    //     });
    // })
    
    describe('problem solver', () => {
        // test('full add', () => {
        //     const p = new Problem([1, 10, 100, 25, 3, 2, 9], 150)
        //     const r = new Resolver(p)
        //     expect(r.isResolvable()).toBe(true)
        // });

        test('get all solutions with two numbers', () => {
            const p = new Problem([10, 100, 25, 50, 2, 7], 965)
            const r = new Resolver(p)
            expect(r.getBestSolutionValue()).toBe(965)
        })

        test('get all solutions with two numbers', () => {
            const p = new Problem([5, 10, 10, 3, 2, 4], 417)
            const r = new Resolver(p)
            expect(r.getBestSolutionValue()).toBe(p.expectedResult)
        })

        
        test('get all solutions with two numbers', () => {
            const p = new Problem([2, 1, 3, 6, 5, 50], 132)
            const r = new Resolver(p)
            expect(r.getBestSolutionValue()).toBe(p.expectedResult)
        })

    })
})