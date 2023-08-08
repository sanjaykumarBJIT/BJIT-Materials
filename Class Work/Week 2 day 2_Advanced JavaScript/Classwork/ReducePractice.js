const dummyArray = [2,4,5,6,7];
const dummyCharArray = ["A","b","C"];

// const reducedValue = dummyArray.reduce(
//     (totalValue, CurrentValue) => totalValue + CurrentValue,
//     0
// );
const reducedValue = dummyCharArray.reduce((totalValue, CurrentValue) => {
    const calculateMult = totalValue + CurrentValue;
    return calculateMult;
},10
);
console.log("Our redicedVlaue will be ",reducedValue);