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
  }
  //attack method - to log attack direction.
  attack(opponent) {
    console.log(
      `${this.name} attack ${opponent.name} with ${opponent.hp} health!`
    );
  }
  //receiveDamage method - to calculate the damage from the opponent
  receiveDamage(damage) {
    this.hp -= damage - this.defense; //setting hp to the actual damage given by the opponent but negating the damage with this pokemons defense
    console.log(
      `lvl ${this.level} ${this.name} received -${damage} Damage and ${this.name} defense negating ${this.defense} Damage: ${this.hp}/${this.maxHp} HP`
    );
    if (this.hp <= 0) {
      console.log(`${this.trainer.name} ${this.name} has fainted!`); // checking if pokemon died after receiving the damage
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
        `${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`
      );
    } else if ((this.hp + 3) > this.maxHp) { // checking if the heal exceeds the max health.
      console.log(
        `${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
          this.maxHp
        }, but receives 2 defense`
      );
      this.hp = this.maxHp;
    } else { // healing this pokemon with 3 health and giving a defense boost of 3
      this.hp += 3;
      console.log(
        `${this.name} heals for 3hp: ${this.hp}/${this.maxHp}, and receives 3 defense`
      );
    }
  }
  calculateDamage() {
    this.accumulatedRound +=1;
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
  resetPokemonLevel(){
    this.level = this.baseLevel;
  }
  resetPokemonHP(){
    this.hp = this.maxHp;
  }
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

//Start of creating pokemon using Pokemon subclass
//Generation I
let pikachu = new ElectricPokemon("Pikachu", 1, 100, 5);
let charmander = new FirePokemon("Charmander", 1, 100, 5);
let bulbasaur = new LeafPokemon("Bulbasaur", 1, 100, 5);
let squirtle = new WaterPokemon("Squirtle", 1, 100, 5);

//Generation II
let chikorita = new LeafPokemon("Chikorita", 1, 100, 5);
let cyndaquil = new ElectricPokemon("Cyndaquil", 1, 100, 5);
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

//start of adding pokemon to trainers
//end of adding pokemon to trainers

// start of setting the matches between brackets

if (numberOfTrainers == 2) {
  console.log('1',numberOfTrainers);
  
}
if (numberOfTrainers == 4) {
  console.log('2',numberOfTrainers);
  
}
if (numberOfTrainers % 2 ==1) {
  console.log('3',numberOfTrainers);
}

// end of setting the matches between brackets

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
console.log(challengers);
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
    console.log(
      `The battle between ${this.trainer1.name} and ${this.trainer2.name} has begun`
    );
    console.log("-----------------------------------------------------------");

    let trainer1PokemonCount = this.trainer1.pokemonList.length;
    let trainer2PokemonCount = this.trainer2.pokemonList.length;
    let trainer1CurrentPokemon = this.trainer1.selectPokemon(0);
    let trainer2CurrentPokemon = this.trainer2.selectPokemon(0);
    
    this.#healPokemons(this.trainer1);
    this.#healPokemons(this.trainer2);
    while (trainer1PokemonCount > 0 && trainer2PokemonCount) {
      while (trainer1CurrentPokemon.hp > 0 && trainer2CurrentPokemon.hp > 0) {
        trainer1CurrentPokemon.nextAction(trainer2CurrentPokemon);
        console.log("-----------------------------------------------------------");

        if (trainer2CurrentPokemon.hp > 0) {
          trainer2CurrentPokemon.nextAction(trainer1CurrentPokemon);
          console.log(
            "-----------------------------------------------------------"
          );
        }
      }
      if (trainer1CurrentPokemon.hp <= 0) {
        console.log(
          `${this.trainer1.name + " " + trainer1CurrentPokemon.name} has lost the battle.`);
        trainer1PokemonCount--;
        let nextPokemon = this.trainer1.pokemonList.length - trainer1PokemonCount;
        trainer1CurrentPokemon = this.trainer1.selectPokemon(nextPokemon);
        console.log("-----------------------------------------------------------");
        trainer2CurrentPokemon.resetPokemonLevel();
        if (trainer1PokemonCount == 0) {
          console.log(`${this.trainer2.name} Wins`);
          this.trainer2.wins += 1;
          this.trainer1.losses += 1;
          this.#result = [this.trainer2,this.trainer1];
        }
      } else {
        console.log(
          `${
            this.trainer2.name + " " + trainer2CurrentPokemon.name
          } has lost the battle.`
        );
        trainer2PokemonCount--;
        let nextPokemon =
          this.trainer2.pokemonList.length - trainer2PokemonCount;
        trainer2CurrentPokemon = this.trainer2.selectPokemon(nextPokemon);
        console.log("-----------------------------------------------------------");
        trainer1CurrentPokemon.resetPokemonLevel();
        if (trainer2PokemonCount == 0) {
          console.log(`${this.trainer1.name} Wins`);
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

//checking if bracket and battle works;
// let bracket1 = new Bracket('First Bracket',challengers[0],challengers[1]);
// bracket1.commenceBattle();
// console.log(bracket1.getWinner(), " ",bracket1.getloser());
// console.log(`%c ${bracket1.title} winner is ${bracket1.getWinner().name} `,'font-size: 16px;color: green;padding: 30px;background: #E6E6FA;');

// let bracket2 = new Bracket('Second Bracket',challengers[2],challengers[3]);

// bracket2.commenceBattle();
// console.log(bracket2.getWinner(),bracket2.getloser());
// console.log(`%c ${bracket2.title} winner is ${bracket2.getWinner().name} `,'font-size: 16px;color: green;padding: 30px;background: #E6E6FA;');

// let bracket3 = new Bracket('Third Bracket',bracket1.getWinner(),challengers[4]);
// bracket3.commenceBattle();
// console.log(bracket3.getWinner(), " ",bracket3.getloser());
// console.log(`%c ${bracket3.title} winner is ${bracket3.getWinner().name} `,'font-size: 16px;color: green;padding: 30px;background: #E6E6FA;');

// let bracket4 = new Bracket('Fourth Bracket',bracket1.getloser(),bracket2.getloser());
// bracket4.commenceBattle();
// console.log(bracket4.getWinner(), " ",bracket4.getloser());
// console.log(`%c ${bracket4.title} winner is ${bracket4.getWinner().name} `,'font-size: 16px;color: green;padding: 30px;background: #E6E6FA;');

// let bracket5 = new Bracket('Fifth Bracket',bracket3.getloser(),bracket4.getWinner());
// bracket5.commenceBattle();
// console.log(bracket5.getWinner(), " ",bracket5.getloser());
// console.log(`%c ${bracket5.title} winner is ${bracket5.getWinner().name} `,'font-size: 16px;color: green;padding: 30px;background: #E6E6FA;');

// console.log(`%c${bracket2.getWinner().name}, ${bracket3.getWinner().name} and ${bracket5.getWinner().name} will proceed to Round Robin Tournament `,'font-size: 16px;color: green;padding: 30px;background: #E6E6FA;');

//console.log(upperBracket.getWinner());
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
    console.log(this.#matches);
    let winner;
    let score =0;
    for (let i = 0; i < 3; i++) {
      console.log(this.RRchallengers[i]);
      if(this.RRchallengers[i].wins > score){
        score = this.RRchallengers[i].wins;
        winner = this.RRchallengers[i];
      }
    }
    if (this.RRchallengers[0].wins == this.RRchallengers[1].wins && this.RRchallengers[1].wins==this.RRchallengers[2].wins) {
      for (let i = 0; i < 3; i++) {
        console.log(this.RRchallengers[i].getAcummulatedRounds())
        if(this.RRchallengers[i].getAcummulatedRounds() > score){
          score = this.RRchallengers[i].getAcummulatedRounds();
          winner = this.RRchallengers[i];
        }
      }
    }
    console.log(winner.name);
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
      console.log("get");
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
      console.log("bye",bye);
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