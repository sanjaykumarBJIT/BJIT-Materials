const Product = require("./products");

const main = () =>{

    const updateParameter = {
        name: "Jojo's bizaare adventures",
        // price: 9.99,
        stock: 44,
        author: "Gorilla Sensei"
    };

    // Product.updateID(8,updateParameter);
    Product.deleteID(10);
}

main();