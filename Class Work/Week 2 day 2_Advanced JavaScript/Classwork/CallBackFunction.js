// function displayFunc(sum){
//     console.log("It is diplaying some value", sum);
// }

// function sumFunction(x, y){
//     const sum = x+y;
//     displayFunc(sum);
// }

// sumFunction(10, 5);



//---------------Rewriting this code using callback function
// function displayFunc(sum){
//     console.log("It is diplaying some value", sum);
// }

// function sumFunction(x, y, callBackFunc){
//     const sum = x+y;
//     callBackFunc(sum);
// }

// sumFunction(10, 5, displayFunc);

//-----------------Displaying odd even with CallBack functions
function displayEvenNumber(sum){
    console.log("It is diplaying some Even value", sum);
}

function displayOddNumber(sum){
    console.log("It is diplaying some Odd value", sum);
}

function sumFunction(x, y, EvenCallBackFunc, OddCallBackFunc){
    const sum = x+y;

    if(sum%2==0){
        EvenCallBackFunc(sum);
    }
    else{
        OddCallBackFunc(sum);
    }

    sum%2==0 ? EvenCallBackFunc(sum) : OddCallBackFunc(sum); //Ternary Operations
}

sumFunction(10, 5, displayEvenNumber, displayOddNumber);






