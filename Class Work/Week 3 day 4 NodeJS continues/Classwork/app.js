const Product = require("./products");

const main = () => {
    const total = Product.getAll();
    //console.log(total);

    // Product.add({
    //     name: "Attack on Titian",
    //     price: 9.99,
    //     stock: 44,
    //     author: "Jhon cena"
    // });

    const element = Product.getOneById(10);
    console.log(element);
}

main();


