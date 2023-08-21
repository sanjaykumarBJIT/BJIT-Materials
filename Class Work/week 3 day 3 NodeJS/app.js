//Imports should be all at the top.. not like this code 

// // setInterval(() => {
// //     console.log("Logging this every 5 sec"); 
// // }, 5000);

// const strImport = require("./fileA");
// const classA = require("./classA");

///////////////////Object A imported
// const myObj = require("./objectA");
// const res2 = myObj.add(20,5);
// console.log("result of objectA",res2);
// console.log(strImport);

// // const classObj = new ClassA();
// // classObj.myFunction();
// classA.myFunction();

// myObj.methodA();


////////////////importing math //index.js is the default file that will execute under math folder
const Math = require("./math");
const res = Math.add(10,5);
console.log("result",res);
