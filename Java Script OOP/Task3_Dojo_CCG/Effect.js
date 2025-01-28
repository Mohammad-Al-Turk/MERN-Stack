import { Card } from "./Card.js";
import { Unit } from "./Unit.js";
export class Effect extends Card{
  constructor(name ,  cost , magnitude, stat){
    super(name ,  cost);
    this.magnitude = magnitude;
    this.stat = stat;
  }
  applyEffect(unit){
    unit[this.stat] += this.magnitude;
    if(unit instanceof Unit){
      console.log(`${unit.name} has increased ${this.stat} by ${this.magnitude}`);

    }
    else{
      thrownewError("Target must be a Unit!!!")
    }

  }
}