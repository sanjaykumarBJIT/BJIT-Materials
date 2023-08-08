function employee(){
    this.employee = "Abdul";
    this.age = 29;
}

var employee1 = new employee();
employee1.gender = "Male";
employee1.salary = 45000;

console.log(employee1.gender);

var employee2 = new employee();
employee2.gender = "Female";
employee2.salary = 49000;

console.log(employee2.gender);

const TotalSalary = employee1.salary+employee2.salary;
console.log("TotalSalary: ",TotalSalary);
