import { createContext, useContext, useState, useEffect } from 'react';
import Header from './header/header'
import Footer from './footer/footer'
import "./body.style.scss"
import useProductHook from "../hooks/product/useCreateProduct"
import useProductDeletion from '../hooks/product/useDeleteProduct';
import useUpdateProduct from '../hooks/product/useUpdateProduct';
export const MyContextVariables = createContext();

const Body = ({ bookData, loading }) => {
    
    const { createPost } = useProductHook();
    const { deletedProductId, error, deleteProduct } = useProductDeletion();
    const{updateProduct} = useUpdateProduct();

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);


    const addToCart = (name, price) => {
        const updatedCart = [...cart, { name, price }];
        setCart(updatedCart);
        updateTotal(calculateTotalPrice(updatedCart));
    };

    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, product) => total + product.price, 0);
    };

    const updateTotal = (newTotal) => {
        setTotal(newTotal);
    };

    console.log("Updated Cart:", cart, total)

    useEffect(() => {
        console.log("Updated Cart:", cart, total);
    }, [cart]);


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [author, setAuthor] = useState("");
    const [releaseDate, setReleaseDate] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., by using a custom hook
        const formData = {
            name: name,
            price: price,
            stock: stock,
            author: author,
            releaseDate: releaseDate,
        }

        createPost(formData);

    };


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., by using a custom hook
        const UpdatedData = {
            name: name,
            price: price,
            stock: stock,
            author: author,
        }

        updateProduct(name,UpdatedData);

    };



    const handleDelete = (productId) => {
        deleteProduct(productId);
      };

    return (
        <>
            <div className='header'>
                <MyContextVariables.Provider value={{ cart, total }}>
                    <Header />
                </MyContextVariables.Provider>
            </div>
            <div>
                <div className='temp'>
                    <div className='banner'>
                        <div className='banner-content'>
                            <h2>Your everyday book store</h2>
                        </div>
                    </div>
                    <div>
                        <h2>Products:</h2>
                    </div>
                    <div className='container-main'>
                        {loading === true && <h1>Loading...</h1>}
                        {bookData?.data?.length > 0 &&
                            bookData?.data.map((card, i) => {
                                // console.log(card);
                                return (
                                    <div key={i}>
                                        <div className="product-card">
                                            <div className="image-container">
                                                <img
                                                    src={"data:image/jpeg;base64,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"}
                                                    className="product-img"
                                                    alt={card.name}
                                                />
                                            </div>
                                            <div className="product-info">
                                                <h3>{card.name}</h3>
                                                <p className="product-description">{card.author}</p>
                                                <p className="product-price">Price: {card.price}$</p>
                                                <atcButton onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(card.name, card.price);
                                                    alert("Added to cart!");
                                                }} className="addToCartButton">Add to Cart</atcButton>
                                                <button className='delete-button' onClick={() => handleDelete(card._id)}>Delete</button> {/* Add the delete button */}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div>
                <div className="form-section">
                    <h2>Create a New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="stock">Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="releaseDate">Release Date:</label>
                            <input
                                type="text"
                                id="releaseDate"
                                name="releaseDate"
                                onChange={(e) => setReleaseDate(e.target.value)}
                            />
                        </div>
                        <button type="submit">Create Product</button>
                    </form>
                </div>
            </div>
            <div>
            <div className="form-section">
                    <h2>Update a Existing Product</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="form-field">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="stock">Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <button type="submit">Update Product</button>
                    </form>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Body