let greet_one = "1st One compiled";
let greet_two = "2nd one compiled";
console.log(greet_one);

setTimeout(function(){
    console.log("Asynchronous");
}, 2000);

console.log(greet_two);