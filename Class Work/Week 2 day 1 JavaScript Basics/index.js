// SIMPLE OUTPUT
console.log("Basic Javascript Part 1");

// JavaScript VARIABLES & DATA TYPES

let x = 6;
const y = 7;
var z = "Hello";
let specialVariable = null;

// OBJECTS
const carObject = {
    color: 'Cyan',
    model: 'Honda Civic Type R',
    numberOfSeats: 4,
    isConditionOkay: true,
}

//JS ARRAY Of Objects
const arrayOfCars = [
    {
        Id:1,
        color: 'Red',
        model: 'ABCD',
        numberOfSeats: 2,
        isConditionOkay: true,
    },

    {
        Id:2,
        color: 'blue',
        model: 'ABCD2',
        numberOfSeats: 3,
        isConditionOkay: true,
    },
    "String ",
    1
]

//ADDING ELEMENTS TO ARRAY
arrayOfCars.push({color: "Black"});

//JS ARITHMATIC OPERATIONS
let A = 10 + 5**2;
const B = 10;
console.log("Value of X: ",x,y,specialVariable,carObject.color,arrayOfCars[0].color);


//JS Functions
function sumFunction(C, D){
    const sum = C+D;

    console.log("In JS Functions The value of x and y: ",C,D);
    console.log("In JS Functions Sum value is: ",sum);
}
sumFunction(5,"+String2");



//Function with return types
console.log("The Sumvalue outside the func: ",sumFunction(5,11)," (o/p in Function with return types)"); //hoisting function
function sumFunction(E, F){
    const sum = E+F;
    return sum;
}

const E = 10;
const F = 15;

const sumValue = sumFunction(E,F);
console.log("Sum with return type: ",sumValue);


//ANONYMOUS Function
const anonymousFunction = function(G, H){
    const AnnonymousSum = G+H;

    return AnnonymousSum;
}

const G = 20;
const H = 15;

const AnnonymousSum = anonymousFunction(G,H);
console.log("Sum with return type: ",AnnonymousSum, " (O/P of Annonymous Function)");


//ARROW FUNCTIONS
const sumFuction = (I,J) => {
    const arrowSum = I+J;

    return arrowSum;
}

console.log("SUM of arrow function ", sumFuction(8,10), "(O/P of Arrow Function)");
