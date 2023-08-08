let totalSalary;
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

let ourPromise = new Promise((resolve, reject)=>{
    totalSalary= employeeObject.reduce((total, emp) => {
        tempSalary = total+emp.salary;
    
        return tempSalary;
    },0
    );

    if(totalSalary>0){
        resolve("No error");
    }else{
        reject("Error fetching data");
    }
})
.then((obj) => {
    console.log("Fetch status", obj);
})
.then(() => {
    console.log("Total Salary",totalSalary);
})
.catch((err) => {
    console.log("Error",err);
})
.finally(() =>{
    console.log("task ended");
});