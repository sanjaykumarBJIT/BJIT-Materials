///////////////////Map

const dummyArray = [2,4,6,7,8];
const objectArray = [
    {
        color: 'blue',
        count: 12, 
    },
    {
        color: 'Red',
        count: 33, 
    },
    {
        color: 'Purple',
        count: 20, 
    },
];

const mappedObject = objectArray.map((obj) =>{
    //console.log("The object: ",obj);

    obj.count+=10;

    return obj;
} );

console.log("Our mapped array: ", mappedObject);

const mappedArray = dummyArray.map((x, i) => {
    const multiplication = i==2 ? x*3 : x;  //only changing index 2

    return multiplication;
});

console.log("Our mapped array: ", mappedArray);