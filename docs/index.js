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
  }

  attack(opponent) {
    console.log(
      `${this.trainer.name} ${this.name} attack ${opponent.name} with ${opponent.trainer.name} ${opponent.hp} health!`
    );
  }

  receiveDamage(damage) {
    this.hp -= damage - this.defense;
    console.log(
      `${this.trainer.name} lvl ${this.level} ${this.name} received -${damage} Damage and ${this.name} defense negating ${this.defense} Damage: ${this.hp}/${this.maxHp} HP`
    );
    if (this.hp <= 0) {
      console.log(`${this.trainer.name} ${this.name} has fainted!`);
    }
    if (this.defense > this.maxDefense) {
      this.defense = this.maxDefense;
    }
  }
  heal() {
    if (this.defense == this.maxDefense) {
      this.defense += 2;
    }
    if (this.hp == this.maxHp) {
      this.hp = this.maxHp;
      console.log(
        `${this.name} already on full health: ${this.hp}/${this.maxHp}, but receives 2 defense`
      );
    } else if ((this.hp + 3) > this.maxHp) {
      console.log(
        `${this.name} overheals for ${this.hp - this.maxHp}: ${this.hp}/${
          this.maxHp
        }, but receives 2 defense`
      );
      this.hp = this.maxHp;
    } else {
      this.hp += 3;
      console.log(
        `${this.name} heals for 3hp: ${this.hp}/${this.maxHp}, and receives 3 defense`
      );
    }
  }
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
  resetPokemonLevel(){
    this.level = this.baseLevel;
  }
}

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

//#region Sub-class
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
      console.log(`${this.trainer.name} decided to use heal on lvl ${this.level} ${this.name}`);
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

//#endregion

//#region Pokemon initialization
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

let chespin = new LeafPokemon("Chespin", 1, 100, 5);
let fennekin = new FirePokemon("Fennekin", 1, 100, 5);
let froakie = new WaterPokemon("Froakie", 1, 100, 5);

let rowlet = new LeafPokemon("Rowlet", 1, 100, 5);
let litten = new FirePokemon("Litten", 1, 100, 5);
let popplio = new WaterPokemon("Popplio", 1, 100, 5);

let grookey = new LeafPokemon("Grookey", 1, 100, 5);
let scorbunny = new FirePokemon("Scorbunny", 1, 100, 5);
let sobble = new WaterPokemon("Sobble", 1, 100, 5);

//#endregion

//#region Trainer initialization
let ash = new Trainer("Ash");
let brock = new Trainer("Brock");
let red = new Trainer("Red");
let may = new Trainer("May");
let ethan = new Trainer("Ethan");
//#endregion

//#region assigning pokemons to trainers
ash.addPokemon(pikachu);
ash.addPokemon(charmander);
ash.addPokemon(bulbasaur);
ash.addPokemon(squirtle);
ash.addPokemon(chikorita);

brock.addPokemon(cyndaquil);
brock.addPokemon(totodile);
brock.addPokemon(treecko);
brock.addPokemon(torchic);
brock.addPokemon(mudkip);

red.addPokemon(turtwig);
red.addPokemon(chimchar);
red.addPokemon(piplup);
red.addPokemon(snivy);
red.addPokemon(tepig);

may.addPokemon(oshawott);
may.addPokemon(chespin);
may.addPokemon(fennekin);
may.addPokemon(froakie);
may.addPokemon(rowlet);

ethan.addPokemon(litten);
ethan.addPokemon(popplio);
ethan.addPokemon(grookey);
ethan.addPokemon(scorbunny);
ethan.addPokemon(sobble);

//#endregion

// let ashPokemon = ash.selectPokemon(0);
// let brockPokemon = brock.selectPokemon(0);

// class Battle{
//     constructor(pokemon1, pokemon2){
//         this.pokemon1 = pokemon1;
//         this.pokemon2 = pokemon2;
//     }
//     startBattle(){
//         console.log(`The battle between ${this.pokemon1.name} and ${this.pokemon2.name} has begun`);
//         console.log('-----------------------------------------------------------');

//         while(this.pokemon1.hp > 0 && this.pokemon2.hp > 0){
//             this.pokemon1.nextAction(this.pokemon2);
//             if(this.pokemon2.hp > 0){
//                 this.pokemon2.nextAction(this.pokemon1);
//             }
//         console.log('-----------------------------------------------------------');
//         }
//         if(this.pokemon1.hp <= 0) {
//             console.log(`${this.pokemon1.name} has lost the battle.`)
//         }else{
//             console.log(`${this.pokemon2.name} has lost the battle.`)
//         }
//     }
// }

//#region Tournament

class Battle {
  constructor(trainer1, trainer2) {
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
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

    while (trainer1PokemonCount > 0 && trainer2PokemonCount) {
      while (trainer1CurrentPokemon.hp > 0 && trainer2CurrentPokemon.hp > 0) {
        trainer1CurrentPokemon.nextAction(trainer2CurrentPokemon);
        console.log(
          "-----------------------------------------------------------"
        );

        if (trainer2CurrentPokemon.hp > 0) {
          trainer2CurrentPokemon.nextAction(trainer1CurrentPokemon);
          console.log(
            "-----------------------------------------------------------"
          );
        }
      }
      if (trainer1CurrentPokemon.hp <= 0) {
        console.log(
          `${
            this.trainer1.name + " " + trainer1CurrentPokemon.name
          } has lost the battle.`
        );
        trainer1PokemonCount--;
        let nextPokemon =
          this.trainer1.pokemonList.length - trainer1PokemonCount;
        trainer1CurrentPokemon = this.trainer1.selectPokemon(nextPokemon);
        console.log(
          "-----------------------------------------------------------"
        );
        trainer2CurrentPokemon.resetPokemonLevel();
        if (trainer1PokemonCount == 0) {
          console.log(`${this.trainer2.name} Wins`);
          return this.trainer2;
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
        console.log(
          "-----------------------------------------------------------"
        );
        trainer1CurrentPokemon.resetPokemonLevel();
        if (trainer2PokemonCount == 0) {
          console.log(`${this.trainer1.name} Wins`);
          return this.trainer1;
        }
      }
    }
  }
  resetWinnersPokemon(trainer) {
    for (let i = 0; i < trainer.pokemonList.length; i++) {
      trainer.pokemonList[i].hp = trainer.pokemonList[i].maxHp;
      trainer.pokemonList[i].level = trainer.pokemonList[i].baseLevel;
    }
  }
}

const trainers = [ash, brock, red, may, ethan];

function setupTournament(trainers) {
  const getchampion = function () {
    let getChampion = Math.floor(Math.random() * 4);
    return trainers[getChampion];
  };

  const champion = getchampion();

  let challengers = function () {
    challengers = trainers.filter((champ) => champ !== champion);
    return challengers;
  };

  return [champion, challengers()];
}

class Tournament {
  constructor(name) {
    this.name = name;
    this.setTournamentBracket(trainers);
  }

  #champion;
  #challengers;
  #firstMatch;
  #secondMatch;

  setTournamentBracket(trainers) {
    const championAndChallenger = setupTournament(trainers);
    this.#champion = championAndChallenger[0];
    this.#challengers = championAndChallenger[1];

    const shuffleChallengers = function (challengers) {
      for (let i = 3; i > 0; i--) {
        let moveChallenger = Math.floor(Math.random() * 3);
        [challengers[i], challengers[moveChallenger]] = [
          challengers[moveChallenger],
          challengers[i],
        ];
      }
      return challengers;
    };

    shuffleChallengers(this.#challengers);

    this.#firstMatch = [this.#challengers[0], this.#challengers[1]];
    this.#secondMatch = [this.#challengers[2], this.#challengers[3]];

    console.log(`First Match is between ${this.#firstMatch[0].name} and ${this.#firstMatch[1].name}`);
    console.log(`Second Match is between ${this.#secondMatch[0].name} and ${this.#secondMatch[1].name}`);
    console.log(`The Depending Champion is ${this.#champion.name}`);
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");
  }
  startTournament() {
    let firstBattleWinner;
    let secondBattleWinner;
    let semiFinalBattleWinner;
    let championshipBattleWinner;
    let firstBattle = new Battle(this.#firstMatch[0], this.#firstMatch[1]);
    let secondBattle = new Battle(this.#secondMatch[0], this.#secondMatch[1]);

    firstBattleWinner = firstBattle.startBattle();
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");
    firstBattle.resetWinnersPokemon(firstBattleWinner);
    for (let i = 0; i < firstBattleWinner.pokemonList.length; i++) {
      console.log(
        firstBattleWinner.pokemonList[i].hp,
        firstBattleWinner.pokemonList[i].level
      );
    }
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");

    secondBattleWinner = secondBattle.startBattle();
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");
    secondBattle.resetWinnersPokemon(secondBattleWinner);
    for (let i = 0; i < secondBattleWinner.pokemonList.length; i++) {
      console.log(
        secondBattleWinner.pokemonList[i].hp,
        secondBattleWinner.pokemonList[i].level
      );
    }
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");

    let semiFinalBattle = new Battle(firstBattleWinner, secondBattleWinner);
    semiFinalBattleWinner = semiFinalBattle.startBattle();

    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");
    semiFinalBattle.resetWinnersPokemon(semiFinalBattleWinner);
    for (let i = 0; i < semiFinalBattleWinner.pokemonList.length; i++) {
      console.log(
        semiFinalBattleWinner.pokemonList[i].hp,
        semiFinalBattleWinner.pokemonList[i].level
      );
    }
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");

    let championshipBattle = new Battle(semiFinalBattleWinner, this.#champion);

    championshipBattleWinner = championshipBattle.startBattle();
    championshipBattleWinner.displayTrainer();
    console.log("%c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", "color: red;");

    console.log(
      firstBattleWinner,
      secondBattleWinner,
      semiFinalBattleWinner,
      championshipBattleWinner
    );
  }
}

let tournament = new Tournament("First Tournament");
tournament.startTournament();
//#endregion
