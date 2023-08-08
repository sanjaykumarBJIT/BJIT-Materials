//Finding out employees whose salaries greater than 50k using JavaScript FILTER 

const employeeObject = [
    {
        name: "John Cena",
        age: 45,
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

const salaryArray = employeeObject.filter((temp) => temp.salary>=50000 && temp.dept!="MERN");

console.log("Employees that have salaries greater than 50K are: ",salaryArray,);
