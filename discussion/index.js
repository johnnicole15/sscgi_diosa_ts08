// console.log('HI');
// Functions
    // function in javascripts are lines/blocks of codes that tells device/application to perform a certain task when called/invoked
// function declarations
    //(function statement) defines a function with the specified parameters
// parameters - are placeholders listed in a function declaration or expression. They represent values that are passed into a function when it is called/invoked (used data into functions)
// variables are named containers for storing data values (used to store and manipulate data)

/*
    Syntax:
        function functionName(){
            code block (statement)
        }
        
        function keyword - used to define a javascript functions.
        functionName - function name 
*/

function printName(){
    console.log("My name is Juan.");
}

//invoked/called - call a function

printName();

//declaredFuntion(); it results ina a error, much like varaibles, we cannot invoke a function we have not yet define

// function declaration vs expression

// function declaration can be created through function declaration by using the function keyword and adding a function name

// declared functions are not executed immediately. They are "Save for later use", and will be executed later, when they are invoked (called upon)

declaredFunction(); //declared functions can be hoisted

// Note: in JS hoistin is a behavior for certain variables and functions to run or use them befoer declaration.

function declaredFunction(){
    console.log("Hello World from declaredFunction!");
}

// Function Expression
    // A function can also be stored in a variable. this is called a function espression

    // A function expression is an anonymous function assigned to the variableFunction
    // Anonymous function - a function without a name, it cannot be hoisted

    let variableFunction = function(){
        console.log("Hello Again!");
    }

    variableFunction();

    let constFunc = function(){
        console.log("initialized with const!");
    }

    constFunc();

    constFunc = function(){
        console.log("re-assigned!");
    }
    constFunc();

// Parameters and Arguments
    function printName(name){
        console.log("My name is "+ name);
    }

    printName("John"); //"John" - Argument
    
    // "name" is called a parameter
    // A parameter acts as a named variable
    // containers that exists only inside of a function
    // it is used to store information that is provided to a function when it is called/invoked
    // An argument is a value passed when invoking a function, this argument is then stored as the parameters within a function.
    printName("hilda");
    printName("Yui", 12)

    function argumentFunction(name){
        console.log("This function was passed as an argument before the message was printed. " + name)
    }

    function invokeFunction(argumentFunction){
        argumentFunction("Hello");
    }

    invokeFunction(argumentFunction);
    //console.log(argumentFunction);


// Object Oriented Programming (OOP)
    // programming style based on classes and objects, group data(properties) and methods (actions)
    // Class - blueprint, template for an object
    // Object - instance of a class
    // Instance refers to an object created from class or a constructor function 
    // constructor is a special method used in a class to initialize objects.

    // basic instance
    const person = {
        name: "Juan Dela Cruz",
        age: 25,
        greet: function(){
            //this refers to the current object (person)
            console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        }
    }

    person.greet();

    class Person{
        constructor(name, age){
            this.name = name; //initializing the 'name' property
            this.age = age; //initializing the 'age' property
        }
        introduce(){
            console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        }
    }
    //create instance using the constructor
    const person1 = new Person("Kiko", 25);
    const person2 = new Person("Jun", 17);

    person1.introduce();
    person2.introduce();

    //without es6
    class Person1{
        constructor(name, age){
            this.name = name; //initializing the 'name' property
            this.age = age; //initializing the 'age' property
            this.introduce = function(){
                console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
            }
        }
        
    }

    class Car{
        constructor(model){
            this.model = model
        }
        start(){
            console.log(`${this.model} is starting . . .`);
        }
    }
    const car1 = new Car("Toyota");
    car1.start();

    //Pokemon Game
    // class Pokemon{
    //     constructor(name, type, level, hp){
    //         this.name = name;
    //         this.type = type;
    //         this.level = level;
    //         this.hp = hp;
    //     }
    //     attack(opponent){
    //         console.log(`${this.name} attack ${opponent.name}!`)
    //         opponent.hp -= this.level
    //         console.log(`${this.name} deals ${this.level} to ${opponent.name} resulting him ${opponent.hp}`)
    //         let damage = this.level * 2;
    //         console.log(`${this.name} level up ${damage}`)
    //     }
    //     heal(){
    //         this.hp += 5;
    //         console.log(`${this.name} used heal resulting ${this.hp} HP!`)
    //     }
    // }
    // class Trainer{
    //     constructor(name, age, pokemon){
    //         this.name = name;
    //         this.age = age;
    //         this.pokemon = pokemon;
    //     }
    //     greet(){
    //         console.log(`Hello, my name is ${this.name} and my pokemon is ${this.pokemon.name}`)
    //     }
    // }
    //Activity ^

    class Pokemon{
        constructor(name, type, level, hp){
            this.name = name;
            this.type = type;
            this.level = level;
            this.hp = hp;
        }
        attack(opponent){
            console.log(`${this.name} attack ${opponent.name}!`)
            let damage = this.level * 2;
            //console.log(`${this.name} level up ${damage}`)
        }
        receiveDamage(damage){
            this.hp -= damage
            console.log(`${this.name} received ${damage} Damage: ${this.hp}`)
            if(this.hp <=0){
                console.log(`${this.name} has fanted!`);
            }
        }
        heal(){
            this.hp += 10;
            console.log(`${this.name} heals 10 HP: ${this.hp}`);
        }
        greet(){
            console.log(`${this.name}!!!!`);
        }
    }

    let pikachu = new Pokemon("Pikachu", "Electric", 5, 100);

    let charmander = new Pokemon("Charmander", "Fire", 5, 100);

    // pikachu.attack(charmander);
    // charmander.receiveDamage(100)
    // charmander.attack(pikachu);
    // pikachu.receiveDamage(20);
    // charmander.heal();

    // let ash = new Trainer("Ash", 12, pikachu);
    // ash.greet();
    // let jay = new Trainer("Jay", 12, charmander);
    // jay.greet();
    // jay.pokemon.attack(ash.pokemon);
    // ash.pokemon.receiveDamage(50);
    // ash.pokemon.heal();

    //Activity^
    class Trainer{
        constructor(name){
            this.name = name;
            this.pokemonList = []
        }
        addPokemon(pokemon){
            this.pokemonList.push(pokemon);
        }
        selectPokemon(index){
            return this.pokemonList[index];
        }
    }

    let ash = new Trainer("Ash");
    ash.addPokemon(pikachu);

    let brock = new Trainer("Brock");
    brock.addPokemon(charmander);

    let ashPokemon = ash.selectPokemon(0);
    let brockPokemon = brock.selectPokemon(0);

    // ashPokemon.attack(brockPokemon);
    // brockPokemon.receiveDamage(25);
    // brockPokemon.attack(ashPokemon);
    // ashPokemon.receiveDamage(25);
    // ashPokemon.heal(10);

    // abstraction it involves simplifying the complex systems by exposing only the essential features
    class Battle{
        constructor(pokemon1, pokemon2){
            this.pokemon1 = pokemon1;
            this.pokemon2 = pokemon2;
        }
        startBattle(){
            console.log(`The battle between ${this.pokemon1.name} and ${this.pokemon2.name} has begun`);

            while(this.pokemon1.hp > 0 && this.pokemon2.hp > 0){
                this.pokemon1.attack(this.pokemon2);
                this.pokemon2.receiveDamage(5);
                if(this.pokemon2.hp > 0){
                    this.pokemon2.attack(this.pokemon1);
                    his.pokemon1.receiveDamage(5);
                }
            }
            if(this.pokemon1.hp <= 0) {
                console.log(`${this.pokemon1.name} has lost the battle.`)
            }else{
                console.log(`${this.pokemon2.name} has lost the battle.`)
            }
        }
    }

    let battle = new Battle(ashPokemon, brockPokemon);
    //battle.startBattle();

    // Inheritance 
        //extends the Pokemon class into specific type of pokemon
            //Electric Pokemon
            //Fire Pokemon
                // each subclass will inherit properties an methods from the base Pokemon class but can also have its own specific behavior
    
    class ElectricPokemon extends Pokemon{
        constructor(name, level, hp){
            // calling the base class constructor
            super(name, "Electric", level, hp);
        }
        // Polymorphism: override attack() method for electric pokemon
        attack(opponent){
            console.log(`${this.name} uses thunder bolt on ${opponent.name}!`);
            let damage = this.level * 3;
            opponent.receiveDamage(damage);
        }
    }

    class FirePokemon extends Pokemon{
        constructor(name, level, hp){
            super(name, "Fire", level, hp);
        }
        attack(opponent){
            console.log(`${this.name} uses Flame Thower on ${opponent.name}!`);
            let damage = this.level * 3;
            opponent.receiveDamage(damage);
        }
    }

    let chimchar = new FirePokemon("Chimchar", 5,100);
    let pichu = new ElectricPokemon("Pichu", 5,100);
    
    chimchar.attack(pichu);

    // Main Activity
    /*
        - Refine the pokemon game, create an activity folder at s08 apply the vcs
        -write pokemon class with following properties and methods (5 trainers with 5 pokemons or more): 
        pokemon and properties: name, type, level, hp
        methods: attack, receiveDamage(), heal, calculateDamage(), powerUp()
        -create subclasses with unique attacks
            - example ElectricPokemon, FIrePokemon
            - Override the attack() and heal() with unique moves 
            ex: WaterPokemon with unique attack called Hydro Pump
        - challenging task - create a battle with multiple Pokemon and randomized pairing
        - explore the OOP concepts int this activity

        Grading: 
            Technical Skill
                - Understanding the requirements
     */

    
    // Polymorphism the ability of the different classes to respond to the same method call in a way that's specific to their type. It allows one interface(method) to be used for a general class of actions with each subclass implement the method in its own way.

    /* method overriding 
        - subclasses an provide their own specific implementation of a method that is already defined in the parent class,

    method overloading 
        - multiple method with the same name can be defined with different parameters, 
    dynamic method resolution
        -the method that gets called depends ont he object's type (not the reference type), which is determined in runtime
    */

    //
    /**
     * 
     * 
     */
    /*
        Mini-Activity
            Create a function for received() and heal()
        - 30 minutes
        SS your code and your results on chatbox
    */

    //Encapsulation - refers to the bundling of data (properties) and the methods (functions) that operate on the data within a single unit or class