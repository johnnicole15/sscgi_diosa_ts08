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
let numberOfPokemon = userPrompt("Input number of ","Pokemon", "2-5", 2,5);
// console.log(numberOfTrainers," ", numberOfPokemon);

//creating pokemon class
class Pokemon {
  constructor(name, type, level, hp, defense) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.baseLevel = level;
    this.hp = hp;
    this.maxHp = hp;
    this.defense = defense;
    this.maxDefense = defense;
    this.accumulatedRound = 0;
    this.color = '';
  }
  //attack method - to log attack direction.
  attack(opponent) {
    console.log(
      `%c${this.name} attack ${opponent.name} with ${opponent.hp} health!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`
    );
  }
  //receiveDamage method - to calculate the damage from the opponent
  receiveDamage(damage) {
    this.hp -= damage - this.defense; //setting hp to the actual damage given by the opponent but negating the damage with this pokemons defense
    console.log(
      `%clvl ${this.level} ${this.name} received -${damage} Damage and ${this.name} defense negating ${this.defense} Damage: ${this.hp}/${this.maxHp} HP`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`
    );
    if (this.hp <= 0) {
      console.log(`%c☠ ${this.trainer.name} ${this.name} has fainted!`,`padding: 5px; border-radius:5px;background: black; color: white`); // checking if pokemon died after receiving the damage
    }
    if (this.defense > this.maxDefense) {
      this.defense = this.maxDefense; // checking if this pokemon aquires a defense boost after healing, then setting it to the original defense after taking a damage
    }
  }
  // heal method - adding appopriate amount of health base on pokemon health condition
  heal() {
    if (this.defense == this.maxDefense) {
      this.defense += 2; // adding a 2 defense boost to this pokemon
    }
    
    if (this.hp == this.maxHp) { // checking if pokemons health is already full, then this heal will not reflect instead it only gives the defense boost of 2.
      this.hp = this.maxHp;
      console.log(
        `%c${this.trainer.name} ${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
      );
    } else if ((this.hp + 3) > this.maxHp) { // checking if the heal exceeds the max health.
      console.log(
        `%c${this.trainer.name} ${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
          this.maxHp
        }, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
      );
      this.hp = this.maxHp;
    } else { // healing this pokemon with 3 health and giving a defense boost of 3
      this.hp += 3;
      console.log(
        `%c${this.trainer.name} ${this.name} heals for 3hp: ${this.hp}/${this.maxHp}, and receives 3 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
      );
    }
  }
  calculateDamage() {
    this.accumulatedRound +=1;
    let critical = Math.floor(Math.random() * 10);
    let damageMultiplyer = 0;
    if (critical < 3) {
      damageMultiplyer = Math.round(2.5 * this.level);
      console.log(
        `%cThe Attack Critical Strike⚔ adding ${
          Math.round(this.level * 2.5) - this.level * 2
        } Damage.`, `background: radial-gradient(circle, rgba(218,75,75,1) 0%, rgba(114,191,208,1) 8%, rgba(235,161,161,1) 23%, rgba(238,255,65,1) 41%, rgba(238,255,100,1) 59%, rgba(239,195,47,1) 79%, rgba(252,176,69,1) 100%); padding: 5px; border-radius: 5px; font-size: 14px;font-weight: bold;`
      );
    } else {
      damageMultiplyer = 2 * this.level;
    }
    return damageMultiplyer;
  }
  resetPokemonLevel(){
    this.level = this.baseLevel;
  }
  resetPokemonHP(){
    this.hp = this.maxHp;
  }
}
//end of pokemon class

//creating Trainer Class
class Trainer {
  constructor(name) {
    this.name = name;
    this.pokemonList = [];
    this.wins = 0;
    this.losses = 0;
  }
  getAcummulatedRounds(){
    let count=0;
    for (let i = 0; i < this.pokemonList.length; i++) {
      count += this.pokemonList[i].accumulatedRound;
    }
    return count;
  }
  addPokemon(pokemon) {
    pokemon.trainer = this;
    this.pokemonList.push(pokemon);
  }
  selectPokemon(index) {
    return this.pokemonList[index];
  }
  displayTrainer(add) {
    console.log(
      `%c${add} ${this.name} `,
      "font-size: 58px;color: white; background: black;border-radius:15px;"
    );
    console.log("%cPokemons",'background: linear-gradient(180deg, rgba(255,255,255,1) 39%, rgba(0,0,0,1) 42%, rgba(0,0,0,1) 62%, rgba(255,0,0,1) 64%); padding: 28px 3px; font-size: 15px;margin: 2px 2%;border-radius:37px;border: solid 2px black;color: white;');
    for (let i = 0; i < this.pokemonList.length; i++) {
      console.log(`\t%c${this.pokemonList[i].name}`,`color:${this.pokemonList[i].color};padding: 6px;background: #455A64;font-size: 14px;margin: 2px 2%;font-weight: bold;border-radius: 5px;`);
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

//creating pokemon subclasses

//creating ElectricPokemon subclass
class ElectricPokemon extends Pokemon {
  constructor(name, level, hp, defense) {
    // calling the base class constructor
    super(name, "Electric", level, hp, defense);
    this.color = '#ffff01'
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`%c${this.trainer.name} decided to use heal on lvl ${this.level} ⚡${this.name}`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;');
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `%c${this.trainer.name} lvl ${this.level} ⚡${this.name} decide to attack ${opponent.trainer.name} ${opponent.name}!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `%c${this.trainer.name} ⚡${this.name} uses` + "%c ⚡ThunderBolt! ",``,
        `color: ${this.color}; background: black; padding: 8px; border-radius:5px;font-size:18px;`
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`%c${this.trainer.name} ⚡${this.name} uses Quick Attack!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`);

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
          `%c⚡${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
      } else if ((this.hp + 5) > this.maxHp) {
        console.log(
          `%c⚡${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
        this.hp = this.maxHp;
      } else {
        this.hp += 5;
        console.log(
          `%c⚡${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
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
    this.color = '#ff4001';
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`%c${this.trainer.name} decided to use heal on lvl ${this.level} 🔥${this.name}`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;');
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `%c${this.trainer.name} lvl ${this.level} 🔥${this.name} decide to attack ${opponent.trainer.name} ${opponent.name}!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `${this.trainer.name} 🔥${this.name} uses` + " %c 🔥Flame Thower! ",
        `color: ${this.color}; background: black; padding: 8px; border-radius:5px;font-size:18px;`
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`%c${this.trainer.name} 🔥${this.name} uses Ember!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`);

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
          `%c🔥${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
      } else if ((this.hp + 5) > this.maxHp) {
        console.log(
          `%c🔥${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
        this.hp = this.maxHp;
      } else {
        this.hp += 5;
        console.log(
          `%c🔥${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
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
    super.color = '#7CB342';
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`%c${this.trainer.name} decided to use heal on lvl ${this.level} 🍃${this.name}`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;');
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `%c${this.trainer.name} lvl ${this.level} 🍃${this.name} decide to attack ${opponent.trainer.name} ${opponent.name}!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `${this.trainer.name} 🍃${this.name} uses` + " %c 🍃Leaf Storm! ",
        `color: ${this.color}; background: black; padding: 8px; border-radius:5px;font-size:18px;`
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`%c${this.trainer.name} 🍃${this.name} uses Vine Whip!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`);

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
          `%c🍃${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
        this.hp = this.maxHp;
      } else if ((this.hp + 5) > this.maxHp) {
        this.hp = this.maxHp;
        console.log(
          `%c🍃${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
      } else {
        this.hp += 5;
        console.log(
          `%c🍃${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
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
    super(name, "Water", level, hp, defense);
    super.color = '#0080ff';
  }
  nextAction(opponent) {
    let getRandom = Math.floor(Math.random() * 8);
    if (getRandom > 2) {
      this.attack(opponent);
    } else {
      console.log(`%c${this.trainer.name} decided to use heal on lvl ${this.level} 🌊${this.name}`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;');
      this.heal();
    }
  }
  attack(opponent) {
    console.log(
      `%c${this.trainer.name} lvl ${this.level} 🌊${this.name} decide to attack ${opponent.trainer.name} ${opponent.name}!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`
    );
    opponent.receiveDamage(this.calculateDamage());
  }
  calculateDamage() {
    if (this.level % 5 == 0) {
      console.log(
        `${this.trainer.name} 🌊${this.name} uses` + " %c 🌊Hydro Pump! ",
        `color: ${this.color}; background: black; padding: 8px; border-radius:5px;font-size:18px;`
      );

      this.level += 2;
      return this.level * 3;
    } else {
      console.log(`%c${this.trainer.name} 🌊${this.name} uses Bubbles!`,`background: linear-gradient(270deg, rgba(238,174,202,1) 62%, rgba(204,179,214,1) 88%, rgba(148,187,233,1) 100%);;padding: 8px; border-radius:5px;`);

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
          `%c🌊${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
      } else if ((this.hp + 5) > this.maxHp) {
        console.log(
          `%c🌊${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
            this.maxHp
          }, but receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
        this.hp = this.maxHp;
      } else {
        this.hp += 5;
        console.log(
          `%c🌊${this.name} heals for 5hp: ${this.hp}/${this.maxHp}, and receives 2 defense`,'background: #66BB6A;border-radius: 5px;padding: 7px 3px; margin: 5px 10px;font-size:14px;'
        );
      }
    }else{
      super.heal();
    }
  }
}
//end of WaterPokemon subclass

//Start of creating pokemon using Pokemon subclass
//Generation I
let pikachu = new ElectricPokemon("Pikachu", 1, 100, 5);
let charmander = new FirePokemon("Charmander", 1, 100, 5);
let bulbasaur = new LeafPokemon("Bulbasaur", 1, 100, 5);
let squirtle = new WaterPokemon("Squirtle", 1, 100, 5);

//Generation II
let chikorita = new LeafPokemon("Chikorita", 1, 100, 5);
let cyndaquil = new FirePokemon("Cyndaquil", 1, 100, 5);
let totodile = new WaterPokemon("Totodile", 1, 100, 5);

//Generation III
let treecko = new LeafPokemon("Treecko", 1, 100, 5);
let torchic = new FirePokemon("Torchic", 1, 100, 5);
let mudkip = new WaterPokemon("Mudkip", 1, 100, 5);

//Generation IV
let turtwig = new LeafPokemon("Turtwig", 1, 100, 5);
let chimchar = new FirePokemon("Chimchar", 1, 100, 5);
let piplup = new WaterPokemon("Piplup", 1, 100, 5);

//Generation V
let snivy = new LeafPokemon("Snivy", 1, 100, 5);
let tepig = new FirePokemon("Tepig", 1, 100, 5);
let oshawott = new WaterPokemon("Oshawott", 1, 100, 5);

//Generation VI
let chespin = new LeafPokemon("Chespin", 1, 100, 5);
let fennekin = new FirePokemon("Fennekin", 1, 100, 5);
let froakie = new WaterPokemon("Froakie", 1, 100, 5);

//Generation VII
let rowlet = new LeafPokemon("Rowlet", 1, 100, 5);
let litten = new FirePokemon("Litten", 1, 100, 5);
let popplio = new WaterPokemon("Popplio", 1, 100, 5);

//Generation VIII
let grookey = new LeafPokemon("Grookey", 1, 100, 5);
let scorbunny = new FirePokemon("Scorbunny", 1, 100, 5);
let sobble = new WaterPokemon("Sobble", 1, 100, 5);

//adding all pokemon objects into an array
let pokemons = [
  pikachu,
  charmander,
  bulbasaur,
  squirtle,
  chikorita,
  cyndaquil,
  totodile,
  treecko,
  torchic,
  mudkip,
  turtwig,
  chimchar,
  piplup,
  snivy,
  tepig,
  oshawott,
  chespin,
  fennekin,
  froakie,
  rowlet,
  litten,
  popplio,
  grookey,
  scorbunny,
  sobble,
];
//End of creating pokemon using Pokemon subclass

//end of setup tournament bracket stage
//end of creating sub classes


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
let challengers = shuffleChallengers(getChallengers);

//adding random pokemon on shuffled trainers
for (let x = 0; x < numberOfTrainers; x++) {
  if (x==4&&numberOfPokemon==5) {
    for (let a = 0; a < 5; a++) {
      //console.log(pokemons[a]);
      challengers[4].addPokemon(pokemons[a]);
    }
  }else{
    for (let y = 0; y < numberOfPokemon; y++) {
      let rand = Math.floor(Math.random()*pokemons.length);
      challengers[x].addPokemon(pokemons[rand]);
      //console.log(pokemons);
      // console.log(pokemons[rand]);
      pokemons.splice(rand,1);
      // console.log(pokemons);
    }
  }
}

for (let i = 0; i < challengers.length; i++) {
  challengers[i].displayTrainer('');
}
//end of trainer shuffle for tournament

//start of battle class

class Battle {
  constructor(title, trainer1, trainer2) {
    this.title = title;
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
  }
  #healPokemons(trainer){
    for (let i = 0; i < trainer.pokemonList.length; i++) {
      trainer.pokemonList[i].resetPokemonHP();
    }
  }
  startBattle() {
    console.log(`%cThe battle between ${this.trainer1.name} and ${this.trainer2.name} has begun`,'background: black;color:white; padding: 12px;font-size: 28px;border-radius: 10px;');
    console.log(`%c-----------------------------------------------------------`,`font-weight: bold; font-size: 24px;`);

    let trainer1PokemonCount = this.trainer1.pokemonList.length;
    let trainer2PokemonCount = this.trainer2.pokemonList.length;
    let trainer1CurrentPokemon = this.trainer1.selectPokemon(0);
    let trainer2CurrentPokemon = this.trainer2.selectPokemon(0);
    
    this.#healPokemons(this.trainer1);
    this.#healPokemons(this.trainer2);
    while (trainer1PokemonCount > 0 && trainer2PokemonCount) {
      while (trainer1CurrentPokemon.hp > 0 && trainer2CurrentPokemon.hp > 0) {
        trainer1CurrentPokemon.nextAction(trainer2CurrentPokemon);
        console.log(`%c-----------------------------------------------------------`,`font-weight: bold; font-size: 24px;`);

        if (trainer2CurrentPokemon.hp > 0) {
          trainer2CurrentPokemon.nextAction(trainer1CurrentPokemon);
          console.log(
            "-----------------------------------------------------------"
          );
        }
      }
      if (trainer1CurrentPokemon.hp <= 0) {
        console.log(`%c${this.trainer1.name + " " + trainer1CurrentPokemon.name} has lost the battle.`, `padding: 5px; border-radius:5px; background: #E0E0E0;`);
        trainer1PokemonCount--;
        let nextPokemon = this.trainer1.pokemonList.length - trainer1PokemonCount;
        trainer1CurrentPokemon = this.trainer1.selectPokemon(nextPokemon);
        console.log(`%c-----------------------------------------------------------`,`font-weight: bold; font-size: 24px;`);
        trainer2CurrentPokemon.resetPokemonLevel();
        if (trainer1PokemonCount == 0) {
          console.log(`%c${this.trainer2.name} Wins 🎉`,`padding: 35px; border-radius: 5px; font-size: 28px;background:#FFF176;`);
          this.trainer2.wins += 1;
          this.trainer1.losses += 1;
          this.#result = [this.trainer2,this.trainer1];
        }
      } else {
        console.log(
          `%c${this.trainer2.name + " " + trainer2CurrentPokemon.name} has lost the battle.`, `padding: 5px; border-radius:5px; background: #E0E0E0;`
        );
        trainer2PokemonCount--;
        let nextPokemon =
          this.trainer2.pokemonList.length - trainer2PokemonCount;
        trainer2CurrentPokemon = this.trainer2.selectPokemon(nextPokemon);
        console.log(`%c-----------------------------------------------------------`,`font-weight: bold; font-size: 24px;`);
        trainer1CurrentPokemon.resetPokemonLevel();
        if (trainer2PokemonCount == 0) {
          console.log(`%c${this.trainer1.name} Wins 🎉`,`padding: 35px; border-radius: 5px;font-size: 28px;background:#FFF176;`);
          this.trainer1.wins += 1;
          this.trainer2.losses += 1;
          this.#result = [this.trainer1,this.trainer2];
        }
      }
    }
  }
  #result = [];
  getWinner(){
    return this.#result[0];
  }
  getloser(){
    return this.#result[1];
  }
}
//end of battle class

//start of RoundRobin Class
class RoundRobin{
  constructor(challengers){
    this.RRchallengers = challengers;
  }
  #matches = [];
  startRoundRobin(){
    this.RRchallengers.forEach(challenger => {
      challenger.wins =0;
      challenger.losses = 0;
      return challenger;
    });
    for (let i = 0; i < this.RRchallengers.length; i++) {
      for (let j = i + 1; j < this.RRchallengers.length; j++) {
          const team1 = this.RRchallengers[i];
          const team2 = this.RRchallengers[j];
          let MatchName = `Match${i+j}`;
    console.log(i,j);
    this.#nextRRMatch(MatchName,team1,team2);
      }
    }
    
    let winner;
    let score =0;
    if (this.RRchallengers[0].wins == this.RRchallengers[1].wins && this.RRchallengers[1].wins==this.RRchallengers[2].wins) {
      for (let i = 0; i < 3; i++) {
        console.log(this.RRchallengers[i].getAcummulatedRounds());
        if(this.RRchallengers[i].getAcummulatedRounds() > score){
          score = this.RRchallengers[i].getAcummulatedRounds();
          winner = this.RRchallengers[i];
        }
      }
    }else{
      for (let i = 0; i < 3; i++) {
        if(this.RRchallengers[i].getAcummulatedRounds() > score){
          score = this.RRchallengers[i].getAcummulatedRounds();
          winner = this.RRchallengers[i];
        }
      }
    }
    for (let i = 0; i < 3; i++) { 
      console.log(`Match${i+1}: %c${this.#matches[`Match${i+1}`].getWinner().name}%c and %c${this.#matches[`Match${i+1}`].getloser().name}`,`padding: 5px; background: green;font-weight: bold;`,``,`padding: 5px;background: red; font-weight: bold;`);
    }
    for (let i = 0; i < 3; i++) {
      console.log(`%c ${this.RRchallengers[i].name}: Wins - ${this.RRchallengers[i].wins}   Losses - ${this.RRchallengers[i].losses} `,`padding: 5px; border-radius: 5px; font-size: 22px; background: #9E9D24;`)
    }
    console.log(`%c🎉${winner.name} is the Champion!!!🎉`,`padding: 30px;background: #4DB6AC;font-size: 32px; font-weight: bold;margin: 0 15%;border-radius: 8px;`)
    winner.displayTrainer('');
  }
    #nextRRMatch(bracketName,trainer1,trainer2){
    this.#matches[bracketName] = new Battle(bracketName,trainer1,trainer2);
    this.#matches[bracketName].startBattle();
  }
}
//end of RoundRobin Class

//start of bracket stage
class BracketStage{
  constructor(challengers){
    this.challengers = challengers;
    this.challengersCount = this.challengers.length;
  }
  #matches = [];

  commenceBracketStage(){
    //procedural bracketing
    let bye;
    let qualifiedToRR=[];
    if (this.challengersCount==2) {
      this.#nextBracketStage('Battle',this.challengers[0],this.challengers[1]);
    }else if (this.challengersCount==4) {
      this.challengersCount /= 2;
      for (let i = 0; i < this.challengersCount; i++) {
        let bracketName = `Bracket${i+1}`
        this.#nextBracketStage(bracketName,this.challengers[i*2],this.challengers[i*2+1])
      }
      this.#nextBracketStage('Bracket3',this.#matches['Bracket1'].getloser(),this.#matches['Bracket2'].getloser());
        
      qualifiedToRR = [this.#matches['Bracket1'].getWinner(),this.#matches['Bracket2'].getWinner(),this.#matches['Bracket3'].getWinner()]
    }else if(this.challengersCount==3){
      qualifiedToRR = this.challengers;
    }else{
      bye = challengers[challengers.length-1];
      for (let i = 0; i < 2; i++) {
        let bracketName = `Bracket${i+1}`
        this.#nextBracketStage(bracketName,this.challengers[i*2],this.challengers[i*2+1]);
        console.log(bracketName, `\nWinner: ${this.#matches[bracketName].getWinner().name} \nLoser: ${this.#matches[bracketName].getloser().name}`);
      }
      this.#nextBracketStage('Bracket3',this.#matches['Bracket1'].getWinner(),bye);
      console.log('Bracket3', `\nWinner: ${this.#matches['Bracket3'].getWinner().name} \nLoser: ${this.#matches['Bracket3'].getloser().name}`);

      this.#nextBracketStage('Bracket4', this.#matches['Bracket1'].getloser(), this.#matches['Bracket2'].getloser());
      console.log('Bracket4', `\nWinner: ${this.#matches['Bracket4'].getWinner().name} \nLoser: ${this.#matches['Bracket4'].getloser().name}`);

      this.#nextBracketStage('Bracket5',this.#matches['Bracket4'].getWinner(),this.#matches['Bracket3'].getloser());
      console.log('Bracket5', `\nWinner: ${this.#matches['Bracket5'].getWinner().name} \nLoser: ${this.#matches['Bracket5'].getloser().name}`);
      
      console.log(`RR: ${this.#matches['Bracket2'].getWinner().name + this.#matches['Bracket3'].getWinner().name + this.#matches['Bracket5'].getWinner().name}`);
      qualifiedToRR = [this.#matches['Bracket2'].getWinner(),this.#matches['Bracket3'].getWinner(),this.#matches['Bracket5'].getWinner()]
    }
    console.log(this.#matches);
    if (numberOfTrainers>2) {
      let roundRobin = new RoundRobin(qualifiedToRR);
      roundRobin.startRoundRobin();
    }
  }
  #nextBracketStage(bracketName,trainer1,trainer2){
      this.#matches[bracketName] = new Battle(bracketName,trainer1,trainer2);
      this.#matches[bracketName].startBattle();
      // console.log("HEEE",this.#matches[bracketName].getloser().wins > 0);
      // console.log("HEEE",this.#matches[bracketName].getWinner().losses > 0);
      }
      

      // if (this.#matches[bracketName].getWinner().losses > 0) {
      //   this.#losersBracket.slice(this.#losersBracket.indexOf(this.#matches[bracketName].getWinner()),1,0);
      //   // console.log(bracketName,this.#winnersBracket.indexOf(this.#matches[bracketName].getWinner()));
      // }
      // if (this.#matches[bracketName].getloser().wins > 0) {
      //   this.#winnersBracket.slice(this.#winnersBracket.indexOf(this.#matches[bracketName].getloser()),1,0);
      //   // console.log(bracketName,this.#winnersBracket.indexOf(this.#matches[bracketName].getloser()));
      // }
  }


let bracketStage = new BracketStage(challengers);
bracketStage.commenceBracketStage();
//end of bracket stage