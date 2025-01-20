const Ninja = require("./Ninja");
class Sensei extends Ninja {
    constructor(name,wisdom =10,health, speed, strength){
        super(name,200,11,11)
        this.wisdom=wisdom;
    }

    speakWisdom = () => {
        this.drinkShake();

    }
    
}
const superSensei = new Sensei("Master Splinter");
superSensei.speakWisdom();
superSensei.showStart();