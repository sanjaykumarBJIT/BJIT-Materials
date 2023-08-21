const Product = require("./products");

const main = async() =>{

    const updateParameter = {
        name: "Jojo's bizaare adventures",
        // price: 9.99,
        stock: 44,
        author: "Gorilla Sensei"
    };

    await Product.updateID(5,updateParameter);
    
    await Product.deleteID(2);
}

main();