    import React from 'react';
    import './productCard.style.scss';
    import Button from '../../atoms/buttons/button';
    const ProductCard = ({ i, card, addToCart, handleDelete }) => {
        console.log("in prodcut card",card.image);
        return (
            <div key={i}>
                <div className="product-card">
                    <div className="image-container">
                        <img
                            src={"https://dailyasianage.com/library/1661800353_6.jpg"}
                            className="product-img"
                            alt={card.name}
                        />
                    </div>
                    <div className="product-info">
                        <h3>{card.name}</h3>
                        <p className="product-description">{card.author}</p>
                        <p className="product-price">Price: {card.price}$</p>

                        {/*Calling atoms here*/}
                        <Button
                            onClick={() => {
                                addToCart(card.name, card.price);
                                alert("Added to cart!");
                            }}
                            className="addToCartButton"
                            type="button"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            className="delete-button"
                            onClick={() => handleDelete(card._id)}
                            type="button"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

        );
    };


    export default ProductCard;
