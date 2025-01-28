import { Unit } from "./Unit.js";
import { Effect } from "./Effect.js";



const unit1 = new Unit("Red Belt Ninja", 3, 3, 4);
const unit2 = new Unit("Black Belt Ninja", 4, 5, 4);

const effect = new Effect("Hard Algorithm", 2, 3,"resilience" );
const UnhandledPromiseRejection = new Effect("Unhandled Promise Rejection",1,-2,"resilience")
const PairProgramming = new Effect("Pair Programming",3, 2,"power");
//Make an instance of "Unhandled Promise Rejection" and play it on "Red Belt Ninja"
UnhandledPromiseRejection.applyEffect(unit1)
// Make an instance of "Pair Programming" and play it on "Red Belt Ninja"
PairProgramming.applyEffect(unit1)
// Make an instance of "Hard Algorithm" and play it on "Red Belt Ninja"
effect.applyEffect(unit1); 
  
// "Red Belt Ninja" uses the attack method on "Black Belt Ninja"

unit1.attack(unit2);

console.log(unit1); // Output: Unit { name: 'Red Belt Ninja', health: 12, attack: 7, defense: 7, effects: [] }
console.log(unit2); // Output: Unit { name: 'Black Belt Ninja', health: 10, attack: 8, defense: 8, effects: [] }