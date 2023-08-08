//Synchronous Example:

const text1 = "This is the First Text";
const text2 = "This is the Text after loading.";

console.log(text1);

console.log("Loading next text");
const temp = 10000;
for(let i = 0; i<200000000;i++){
    if(i%15000000==0){
        console.log("-");
    }
}

console.log(text2);