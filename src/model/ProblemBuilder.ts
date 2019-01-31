import { Problem } from "./Problem";
import { shuffle } from "../utils";

export class ProblemBuilder {

    static generate(){
        /*Les règles du jeu
            Le joueur tire au hasard, sans remplacement, six plaques portant des numéros parmi un ensemble de 28 plaques ainsi constitué

            1. 20 plaques numérotées de 1 à 10 (2 par nombre)
            2. 2 plaques de 25
            3. 2 plaques de 50
            4. 2 plaques de 75
            5. 2 plaques de 100
            
            On tire également au hasard un nombre N entre 100 et 999. 
        */
        let possibilities: number[] = []
        for (let nb = 0; nb < 2; nb++) {
            [1,2,3,4,5,6,7,8,9,10].forEach(num => possibilities.push(num) )            
        }
        [25,50,75,100].forEach(num => possibilities.push(num))            
        possibilities = shuffle(possibilities)

        let numbers: number[] = possibilities.slice(0, 6)
        const min = 100
        const max = 999
        const expectedResult = Math.floor(Math.random() * (max - min +1)) + min;

        return new Problem(numbers, expectedResult)
    }

}