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