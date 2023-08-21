class Calculations{
    area(height, length){
        return height*length;
    };

    perimeter(height, length){
        return (height+length)*2;
    }
}

module.exports = new Calculations();