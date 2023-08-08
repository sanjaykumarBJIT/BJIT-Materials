//Renaming normal ID with BJIT ID using Javascript_MAPS

const employeeObject = [
    {
        name: "John Cena",
        age: 50,
        salary: 60000,
        dept: "MERN",
        id: 1,
    },
    {
        name: "Lionel Messi",
        age: 36,
        salary: 70000,
        dept: "Dev-Ops",
        id: 2,
    },
    {
        name: "Romelu Lukaku",
        age: 70,
        salary: 8000,
        dept: "HR",
        id: 3,
    }
];


const mappedID_array = employeeObject.map((temp, i) => {
    const BJIT_id = temp.id<100 ? temp.id = "000-"+temp.id : "00-"+temp.id ;

    return BJIT_id;
})

console.log(mappedID_array);
