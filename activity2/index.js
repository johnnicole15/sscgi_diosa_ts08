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
//err
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
