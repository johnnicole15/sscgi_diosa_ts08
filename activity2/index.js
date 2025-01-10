// creating prompt function
function userPrompt(promptMessage, entity, promptDefaultText,constraintMin, constraintMax){
  let result = prompt(promptMessage+entity,promptDefaultText, constraintMin, constraintMax);
  
  if(result === ""||isNaN(result)||result<constraintMin||result>constraintMax){
    result = userPrompt(`Invalid Input! Please input number of `,entity, "2-5", 2, 5);
  }
  //console.log(result);
  return result;
}

let numberOfTrainers = userPrompt("Input number of ","Trainers", "2-5", 2,5);
// let numberOfPokemon = userPrompt("Input number of ","Pokemon", "2-5", 2,5);
// console.log(numberOfTrainers," ", numberOfPokemon);

//creating pokemon class
class Pokemon {
  constructor(name, type, damage, hp, defense, speed, evasiveness, level) {
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.hp = hp;
    this.maxHp = hp;
    this.defense = defense;
    this.maxDefense = defense;
    this.speed = speed;
    this.evasiveness = evasiveness;
    this.level = level;
  }
  //attack() method - to log attack direction.
  attack(opponent) {
    console.log(
      `%c level${this.level}%c ${this.name} attack%c level${opponent.level}%c ${opponent.name}`,
      "font-size: 10px;",
      "",
      "font-size: 10px;",
      ""
    );
  }
  //end of attack() method

  //receiveDamage() method - to calculate the damage from the opponent
  receiveDamage(damage) {
    this.hp -= damage - this.defense; //setting hp to the actual damage given by the opponent but negating the damage with this pokemons defense
    console.log(
      `lvl ${this.level} ${this.name} received -${damage} Damage and ${this.name} defense negating ${this.defense} Damage: %c${this.hp}%c/${this.maxHp} HP`,
      "vertical-align: super; color: red;",
      ""
    );
    if (this.hp <= 0) {
      console.log(` ${this.name} has fainted!`); // checking if pokemon died
    }
    if (this.defense > this.maxDefense) {
      this.defense = this.maxDefense; // checking if this pokemon aquires a defense boost after healing, then setting it to the original defense after taking a damage
    }
  }
  //end of receivedDamage() method
  //heal() method
  heal() {
    if (this.defense == this.maxDefense) {
      this.defense += 2; // adding a 2 defense boost to this pokemon
    }

    if (this.hp == this.maxHp) {
      // checking if pokemons health is already full, then this heal will not reflect instead it only gives the defense boost of 2.
      this.hp = this.maxHp;
      console.log(
        `${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`
      );
    } else if (this.hp + 3 > this.maxHp) {
      // checking if the heal exceeds the max health.
      this.hp = this.maxHp;
      console.log(
        `${this.name} heals for full health: %c${this.hp}%c/${this.maxHp}, and receives 2 defense`,
        "color: lawngreen;",
        ""
      );
    } else {
      // healing this pokemon with 3 health and giving a defense boost of 3
      this.hp += 3;
      console.log(
        `${this.name} heals for 3hp: ${this.hp}/${this.maxHp}, and receives 3 defense`
      );
    }
  }
  //end of heal() method

  //calculateDamage() method
  calculateDamage() {
    let critical = Math.floor(Math.random(), 10);
    let damageMultiplyer = 0;
    if (critical < 3) {
      damageMultiplyer = Math.round(2.5 * this.level);
      console.log(
        `The Attack Critical Strike adding ${
          Math.round(this.level * 2.5) - this.level * 2
        } Damage.`
      );
    } else {
      damageMultiplyer = 2 * this.level;
    }
    return damageMultiplyer;
  }
  resetPokemonLevel() {
    this.level = this.baseLevel;
  }
  //end of calculateDamage() method
}
//checking if Pokemon Class methods are working as intended
let a = new Pokemon("Pikachu", "Electric", 1, 9, 1, 3, 2, 1);
let b = new Pokemon("Charmander", "Fire", 1, 9, 1, 3, 3, 1);

a.attack(b);
b.receiveDamage(a.calculateDamage());
b.heal();

//end of pokemon class

//creating Trainer Class
class Trainer {
  constructor(name) {
    this.name = name;
    this.pokemonList = [];
  }
  addPokemon(pokemon) {
    pokemon.trainer = this;
    this.pokemonList.push(pokemon);
  }
  selectPokemon(index) {
    return this.pokemonList[index];
  }
  displayTrainer() {
    console.log(
      "%c\n Champion!!! " + `${this.name} `,
      "font-size: 28px;color: white; background: black;"
    );
    console.log("\nPokemons");
    for (let i = 0; i < this.pokemonList.length; i++) {
      console.log("   ", this.pokemonList[i].name);
    }
  }
}
//end of Trainer Class

//creating trainer objects
const ash = new Trainer('Ash');
const brock = new Trainer('Brock');
const red = new Trainer('Red');
const may = new Trainer('May');
const ethan = new Trainer('Ethan');
//console.log(ash,brock,red,may,ethan);
//end of trainer objects


//start setup tournament bracket stage

//creating shuffle trainer for tournament
let trainers = [ash,brock,red,may,ethan];
const shuffleChallengers = function (challengers) {
  for (let i = challengers.length-1; i > 0; i--) {
    let moveChallenger = Math.floor(Math.random() * challengers.length);
    [challengers[i], challengers[moveChallenger]] = [
      challengers[moveChallenger],
      challengers[i],
    ];
  }
  return challengers;
};
// get the challenger 
const getChallengers = trainers.filter(trainer => trainers.indexOf(trainer) < numberOfTrainers);

//getting the challengers and automatically shuffle them
let challenger = shuffleChallengers(getChallengers);
console.log(challenger);
//end of trainer shuffle for tournament

//
//end of setup tournament bracket stage

//creating pokemon subclasses

//creating ElectricPokemon subclass
class ElectricPokemon extends Pokemon {
  constructor(name, level, hp, defense) {
    // calling the base class constructor
    super(name, "Electric", level, hp, defense);
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`%c \u{1F60E} ${this.trainer.name} decided to use heal on lvl ${this.level} ${this.name}`,'background: gray; margin: 5px 15px;');
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `${this.trainer.name} lvl ${this.level} ${this.name} decide to attack ${opponent.trainer.name} ${opponent.name}!`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `${this.trainer.name} ${this.name} uses` + " %c ThunderBolt! ",
        "color: yellow; background: black"
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`${this.trainer.name} ${this.name} uses Quick Attack!`);

      this.level += 2;
      return super.calculateDamage();
    }
  }
  heal() {
    if (this.defense == this.maxDefense) {
      this.defense += 2;
    }
    if (this.level % 5 == 0) {
      if ((this.hp) == this.maxHp) {
        this.hp = this.maxHp;
        console.log(
          `${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`
        );
      } else if ((this.hp + 5) > this.maxHp) {
        console.log(
          `${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`
        );
        this.hp = this.maxHp;
      } else {
        this.hp += 5;
        console.log(
          `${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`
        );
      }
    }else{
      super.heal();
    }
    
  }
}
//end of ElectricPokemon subclass

//creating FirePokemon subclass
class FirePokemon extends Pokemon {
  constructor(name, level, hp, defense) {
    // calling the base class constructor
    super(name, "Fire", level, hp, defense);
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`${this.name} decided to use heal`);
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `${this.trainer.name} lvl ${this.level} ${this.name} decide to attack ${opponent.name}!`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `${this.trainer.name} ${this.name} uses` + " %c Flame Thower! ",
        "color: Orange; background: black"
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`${this.trainer.name} ${this.name} uses Ember!`);

      this.level += 2;
      return super.calculateDamage();
    }
  }
  heal() {
    if (this.defense == this.maxDefense) {
      this.defense += 2;
    }
    if (this.level % 5 == 0) {
      if ((this.hp) == this.maxHp) {
        this.hp = this.maxHp;
        console.log(
          `${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`
        );
      } else if ((this.hp + 5) > this.maxHp) {
        console.log(
          `${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`
        );
        this.hp = this.maxHp;
      } else {
        this.hp += 5;
        console.log(
          `${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`
        );
      }
    }else{
      super.heal();
    }
  }
}
//end of FirePokemon subclass

//creating LeafPokemon subclass
class LeafPokemon extends Pokemon {
  constructor(name, level, hp, defense) {
    // calling the base class constructor
    super(name, "Fire", level, hp, defense);
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`${this.name} decided to use heal`);
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `${this.trainer.name} lvl ${this.level} ${this.name} decide to attack ${opponent.name}!`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `${this.trainer.name} ${this.name} uses` + " %c Leaf Storm! ",
        "color: Green; background: black"
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`${this.trainer.name} ${this.name} uses Vine Whip!`);

      this.level += 2;
      return super.calculateDamage();
    }
  }
  heal() {
    if (this.defense == this.maxDefense) {
      this.defense += 2;
    }
    if (this.level % 5 == 0) {
      if ((this.hp) == this.maxHp) {
        console.log(
          `${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`
        );
        this.hp = this.maxHp;
      } else if ((this.hp + 5) > this.maxHp) {
        this.hp = this.maxHp;
        console.log(
          `${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`
        );
      } else {
        this.hp += 5;
        console.log(
          `${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`
        );
      }
    }else{
      super.heal();
    }
  }
}
//end of LeafPokemon subclass

//creating WaterPokemon subclass
class WaterPokemon extends Pokemon {
  constructor(name, level, hp, defense) {
    // calling the base class constructor
    super(name, "Fire", level, hp, defense);
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`${this.name} decided to use heal`);
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `${this.trainer.name} lvl ${this.level} ${this.name} decide to attack ${opponent.name}!`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `${this.trainer.name} ${this.name} uses` + " %c Hydro Pump! ",
        "color: blue; background: black"
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`${this.trainer.name} ${this.name} uses Bubbles!`);

      this.level += 2;
      return super.calculateDamage();
    }
  }
  heal() {
    if (this.defense == this.maxDefense) {
      this.defense += 2;
    }
    if (this.level % 5 == 0) {
      if ((this.hp) == this.maxHp) {
        this.hp = this.maxHp;
        console.log(
          `${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`
        );
      } else if ((this.hp + 5) > this.maxHp) {
        console.log(
          `${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`
        );
        this.hp = this.maxHp;
      } else {
        this.hp += 5;
        console.log(
          `${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`
        );
      }
    }else{
      super.heal();
    }
  }
}
//end of WaterPokemon subclass

//end of creating sub classes