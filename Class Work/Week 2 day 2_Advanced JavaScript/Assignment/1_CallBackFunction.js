//Checking Leap year using call back function


function displayLeapYr(year){
    console.log(year,"is leap year.");
}

function displayNotLeapYr(year){
    console.log(year,"is not a leap year.");
}

function checkLeapYear(year,Leap,NotLeap){
    if(year%400 == 0){
        Leap(year);
    }
    else if(year%100 == 0){
        NotLeap(year);
    }
    else if(year%4==0){
        Leap(year);
    }
    else{
        NotLeap(year);
    }
}

checkLeapYear(1900,displayLeapYr,displayNotLeapYr);



