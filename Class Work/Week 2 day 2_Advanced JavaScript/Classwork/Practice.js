const array = [1,2,3,4,5];
const objArray = [
    {
        Name: "Alal",
        id: 39,
    },
    {
        Name: "Dulal",
        id: 157,
    }
];

const mappedData = objArray.map((x) => {
    x.Name+=" San";
    x.id = "000-"+x.id;
    return x;
})
console.log("People's info: ",mappedData);



const filteredData = objArray.filter((x, i) => {
    x.le
})
