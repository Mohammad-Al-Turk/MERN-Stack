class Ninja {
    constructor(name, health = 100, speed = 3, strength = 3) {
        this.name = name;
        this.health = health; 
        this.speed = speed; 
        this.strength = strength;
    }

    sayName = () => console.log(`Ninja's name is: ${this.name}`);
    showStart = () => console.log("name:" + this.name +" "+"strength:"+ this.strength +" "+"speed:"+ this.speed+ " "+"health:" + this.health);
    drinkShake = () => this.health += 10;
}

const ninja1 = new Ninja("Mohammad"); 
ninja1.sayName()
ninja1.showStart()
ninja1.drinkShake()
ninja1.showStart()

module.exports = Ninja;


