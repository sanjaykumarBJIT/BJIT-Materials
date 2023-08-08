//Finding Total expenditure on Employee Salary using JavaScript FILTER
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



const totalSalary = employeeObject.reduce((total, emp) => {
    tempSalary = total+emp.salary;

    return tempSalary;
},0
);

console.log("Total Salary of employees:",totalSalary)






