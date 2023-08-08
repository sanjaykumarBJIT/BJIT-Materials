//-------------- FILTER----------------//

const OurArray = [
    "Spray",
    "limit",
    "Elite",
    "Extrovert",
    "Destruction",
    "Present",
];

const  filteredArray = OurArray.filter((x) => x.length>6);

console.log("our filtered array",filteredArray);