//Asynchronous Example:

const text1 = "This is the First Text";
const text2 = "This is the Text written after loading screen.";

console.log(text1);

const temp = 10000;
setTimeout(function(){
    for(let i = 0; i<100000000;i++){
        if(i%10000000==0){
            console.log("-");
        }
        if(i == 199999999){
            console.log("File loaded")
        }
        
    }
})
console.log(text2);