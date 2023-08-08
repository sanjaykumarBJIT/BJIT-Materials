let ourPromise = new Promise((resolve, reject)=>{
    const x=3;

    if(x==3){
        resolve("resolve msg");
    }else{
        reject("Try harder");
    }
})
.then((obj) => {
    console.log("It worked", obj);
})
.then(() => {
    console.log("As It worked, We can move to another function");
})
.catch((err) => {
    console.log("Error",err);
})
.finally(() =>{
    console.log("It always works");
});