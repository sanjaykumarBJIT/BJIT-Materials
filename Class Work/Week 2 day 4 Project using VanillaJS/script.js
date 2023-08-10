async function productData(){
    const response = await fetch("https://dummyjson.com/products/");
    const jsonData = await response.json();
    console.log(jsonData);

    

    document.getElementById("product_holder").innerHTML = `
    ${
        jsonData.products.map((x, i) => {
            return(
                `
                <div class="product_div" onclick="onMouserOverHandler(${i})">
                    <img src=${x.images[0]} alt=${x.title} class="product-img">
                    
                    <h5 class="Product-text" id="text">${x.description}</h5>
                </div>
                
                `
            )
            
        }).join("")
    }

    `
}

function onMouserOverHandler(i){
    const textID = document.querySelectorAll(".product_div")
    textID[i].style.backgroundColor="rgb(20, 114, 143)";
    console.log("Triggered");
}

productData();




// // Sample product data
// const products = [
//     { id: 1, name: 'Product 1', price: 10.99 },
//     { id: 2, name: 'Product 2', price: 19.99 },
//     { id: 3, name: 'Product 3', price: 7.49 }
// ];

// const cart = [];

// // Function to display products
// function displayProducts() {
//     const productList = document.getElementById('product-list');
//     productList.innerHTML = '';

//     products.forEach(product => {
//         const productDiv = document.createElement('div');
//         productDiv.innerHTML = `
//             <h3>${product.name}</h3>
//             <p>Price: $${product.price.toFixed(2)}</p>
//             <button onclick="addToCart(${product.id})">Add to Cart</button>
//         `;
//         productList.appendChild(productDiv);
//     });
// }

// // Function to add a product to the cart
// function addToCart(productId) {
//     const productToAdd = products.find(product => product.id === productId);
//     if (productToAdd) {
//         cart.push(productToAdd);
//         displayCart();
//     }
// }

// // Function to display cart items
// function displayCart() {
//     const cartDiv = document.getElementById('cart');
//     cartDiv.innerHTML = '';

//     cart.forEach(item => {
//         const cartItemDiv = document.createElement('div');
//         cartItemDiv.innerHTML = `
//             <p>${item.name} - $${item.price.toFixed(2)}</p>
//             <button onclick="removeFromCart(${item.id})">Remove</button>
//         `;
//         cartDiv.appendChild(cartItemDiv);
//     });
// }

// // Function to remove a product from the cart
// function removeFromCart(productId) {
//     const index = cart.findIndex(item => item.id === productId);
//     if (index !== -1) {
//         cart.splice(index, 1);
//         displayCart();
//     }
// }

// // Initial setup
// displayProducts();
