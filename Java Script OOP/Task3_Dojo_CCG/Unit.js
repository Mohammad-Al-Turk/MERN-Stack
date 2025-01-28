import { Card } from "./Card.js";
export class Unit extends Card{
  constructor(name , cost , resilience , power){
    super(name , cost);
    this.resilience = resilience;
    this.power = power;
  }
  attack(target){
    //reduce target res by power
    target.resilience -= this.power;
    console.log(`${this.name} attacks ${target.name} and deals ${this.power} damage. ${target.name} has ${target.resilience} resilience left.`);
  }


} 
